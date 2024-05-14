import React from "react";

function page({ params }) {

  const id = params.id;

  return <h1>{id}</h1>;
}

export default page;
