import * as React from "react";

function Tables(props) {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}

const MemoTables = (Tables);
export default MemoTables;
