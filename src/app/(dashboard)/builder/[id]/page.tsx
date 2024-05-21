import { GetFormById } from "@/actions/form";
import FormBuilder from "@/formBuilder/components/FormBuilder";
import React from "react";

async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // const { id } = params;
  // const form = await GetFormById(Number(id));
  // if (!form) {
  //   throw new Error("form not found");
  // }
  return <FormBuilder form={{name: "a", id: 5}} />;
}

export default BuilderPage;
