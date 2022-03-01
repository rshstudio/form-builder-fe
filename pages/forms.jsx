import React from "react";
import { useLayout } from "@context/layout";

export default function Forms() {
  const { setPageTitle } = useLayout();
  const unusedVar = null;

  React.useEffect(() => {
    setPageTitle("Forms");
  }, [setPageTitle]);

  return (
    <div className="px-4 py-4 sm:px-0">
      <div className="border-4 border-gray-200 border-dashed rounded-lg h-96" />
      <h1 className="max-w-xl mx-auto text-3xl font-bold underline"></h1>
    </div>
  );
}
