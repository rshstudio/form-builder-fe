import React from "react";
import { useLayout } from "@context/layout";

export default function Home() {
  const { setPageTitle } = useLayout();

  React.useEffect(() => {
    setPageTitle("Screens");
  }, [setPageTitle]);

  return (
    <div className="px-4 py-4 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
    </div>
  );
}
