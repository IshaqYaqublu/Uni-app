import React from "react";
import Image from "next/image";
import styles from "./Search.module.css";

const Search = ({ searchSection, setSearchSection }) => {
  return (
    <div className={`${styles.search} w-100`}>
      <input
        placeholder="Search"
        onChange={({ target: { value } }) => setSearchSection(value)}
        value={searchSection}
      />
      <div className={styles.searchIcon}>
        <Image
          className="img img-fluid"
          src="/images/search.svg"
          alt="photo"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default Search;
