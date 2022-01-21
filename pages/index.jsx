import React from "react";
import { useLayout } from "@context/layout";
import Tasks from "@components/Tasks";

export default function Home() {
  const { setPageTitle } = useLayout();

  React.useEffect(() => {
    setPageTitle("Dashboard");
  }, [setPageTitle]);

  return (
    <div className="px-4 py-4 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg px-4 py-4 lg:py-8">
        <Tasks />
      </div>
    </div>
  );
}
