export default function Task({ task }) {
  //  Task : {
  //   id: 1,
  //   created_at: '2025-04-22T08:20:55.017988+00:00',
  //   taskName: 'Complete task 1',
  //   columnId: 1,
  //   boardId: 1,
  //   accountId: 1,
  //   taskDescription: 'sample description'
  // }

  return (
    <div className="px-12 py-4 [word-spacing:4px] bg-primary-700 hover:bg-primary-600 transition-all cursor-pointer rounded-xl shadow-md shadow-primary-800 ">
      <div className="text-xl font-semibold mb-4">{task.taskName}</div>
      <div className="text-primary-400 text-base font-bold">
        0 out of 2 subtasks
      </div>
    </div>
  );
}
