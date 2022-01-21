import React from "react";
import { useLayout } from "@context/layout";

export default function Home() {
  const { setPageTitle } = useLayout();

  React.useEffect(() => {
    setPageTitle("Reports");
  }, [setPageTitle]);

  return (
    <div className="px-4 py-4 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
      <h1 className="max-w-xl mx-auto text-3xl font-bold underline"></h1>
    </div>
  );
}
