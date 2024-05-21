"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import { ENDPOINTS } from "@/src/api/routing";
import { useGetTodo } from "@/src/hooks/useGetTodo";
import { usePostTodo } from "@/src/hooks/usePostTodo";
import Search from "@/src/components/Search/Search";
import List from "@/src/components/List/List";
import { useDeleteTodo } from "@/src/hooks/useDeleteTodo";

const sections = [
  { title: "My Day", id: 1 },
  { title: "Important", id: 2 },
  { title: "Planned", id: 3 },
  { title: "Assigned to me", id: 4 },
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchTodos, todos } = useGetTodo();
  const { postTodo, status, setStatus } = usePostTodo();
  const { deleteTodo, deleteStatus } = useDeleteTodo();

  useEffect(() => {
    fetchTodos();
  }, [deleteStatus]);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };
  const [currentSection, setCurrentSection] = useState(sections[0]);
  const [searchSection, setSearchSection] = useState("");
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("Anonim");

  useEffect(() => {
    fetchTodos();
    setStatus(0);
  }, [status]);

  useEffect(() => {
    if (!!searchParams.get("section")) {
      setCurrentSection(
        sections.find((e) => e.id == searchParams.get("section"))
      );
    }
  }, [searchParams.get("section")]);

  const handleChangeSection = (section) => {
    setCurrentSection(section);
    router.push(
      `/dashboard?section=${encodeURIComponent(section?.id)}`,
      undefined,
      {
        shallow: true,
      }
    );
  };
  function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  useEffect(() => {
    const userCookie = getCookie("user");
    let userId;
    if (userCookie) {
      const user = JSON.parse(userCookie);
      setUserName(user.username);
      userId = user.id;
      setId(userId);
    }
  }, []);
  const handleAdd = (e) => {
    e.preventDefault();

    if (!!value) {
      postTodo({
        status: currentSection?.id,
        name: value,
        isDeleted: false,
        userId: id,
      });
      setValue("");
    }
  };
  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  return (
    <div>
      <main className={` ${styles.main} container-fluid d-flex py-4 `}>
        {Array.from({ length: 4 }, (_, idx) => idx + 1).map((image, index) => (
          <Image
            key={index}
            src={`/images/${image}.png`}
            alt="photo"
            width={245}
            height={245}
            className={styles.image}
          />
        ))}
        <div className={`${styles.mainLeft} col-5 col-lg-5  text-center`}>
          <div className={styles.left}>
            <div className="d-flex justify-content-center align-items-center mb-4">
              <div className={`${styles.profileImg}`}>
                <Image
                  className="img img-fluid"
                  src="/images/profile.png"
                  alt="photo"
                  width={50}
                  height={50}
                />
              </div>{" "}
              <span className={`${styles.profileText} ms-4`}>
                {userName}
                <button
                  onClick={() => {
                    deleteCookie("user");
                    router.push("/login");
                  }}
                  style={{ all: "unset", cursor: "pointer" }}
                  className="ms-4"
                >
                  <Image
                    className="img img-fluid"
                    src="/images/export.svg"
                    alt="photo"
                    width={30}
                    height={30}
                  />
                </button>
              </span>
            </div>
            <div className={`${styles.search} w-100`}>
              <Search
                searchSection={searchSection}
                setSearchSection={setSearchSection}
              />
            </div>
            <div className={styles.section}>
              <ul>
                {sections
                  .filter((item) =>
                    item.title
                      .toLowerCase()
                      .includes(searchSection.toLowerCase())
                  )
                  .map((section, index) => (
                    <li
                      key={index}
                      onClick={() => handleChangeSection(section)}
                    >
                      {section.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.mainRight} col-7 col-lg-7`}>
          <div className={styles.right}>
            <div>
              <h1>{currentSection?.title}</h1>
              <List
                items={todos
                  ?.filter((e) => e?.userId == id)
                  ?.filter((e) => e?.status == currentSection.id)}
                handleDelete={handleDelete}
              />
            </div>
            <form className={styles.rightInput} onSubmit={handleAdd}>
              <input
                placeholder="Try typing ‘Pay utilities by 6pm Friday’"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
