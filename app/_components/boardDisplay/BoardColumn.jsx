"use client";

import Task from "./Task";
import ColContextMenu from "./ColContextMenu";

export default function BoardColumn({ boardColumn, tasks }) {
  const tasksForColumn = tasks.filter(
    (task) => task.columnId === boardColumn.id
  );

  return (
    <div className="min-w-[400px]  flex flex-col gap-6  rounded-xl p-4 bg-primary-900 shadow-md shadow-primary-900">
      <div className="flex items-center justify-between text-primary-500">
        <h3 className="uppercase text-primary-500 font-semibold text-lg [word-spacing:4px]">
          {boardColumn.columnName} ({tasksForColumn.length})
        </h3>

        <ColContextMenu boardColumn={boardColumn} />
      </div>

      {/* Tasks */}
      {tasksForColumn.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
}
