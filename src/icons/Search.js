import * as React from "react";

function Search(props) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const MemoSearch = (Search);
export default MemoSearch;
