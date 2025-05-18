import React from "react";

type ViewSwitcherProps = {
  view: "board";
  setView: (view: "board" | "list") => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  view,
  setView,
}) => {
  return (
    <div className="flex gap-2">
      <button
        className={`px-4 py-2 rounded ${
          view === "board" ? "bg-blue-500 text-white" : "bg-white border"
        }`}
        onClick={() => setView("board")}
      >
        Board
      </button>
      {/* <button
        className={`px-4 py-2 rounded ${
          view === "list" ? "bg-blue-500 text-white" : "bg-white border"
        }`}
        onClick={() => setView("list")}
      >
        List
      </button> */}
    </div>
  );
};
