import React from "react";

function page({ params }) {
  const id = params.id;

  return <div>{id}</div>;
}

export default page;
