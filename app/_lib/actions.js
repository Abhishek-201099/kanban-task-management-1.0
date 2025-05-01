"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getAccount } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/boards" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createNewBoardAction(boardName, boardColumns) {
  const session = await auth();
  const account = await getAccount(session.user.email);

  // 1. Add the boardName and accountID to boards table.
  const { data: board, error } = await supabase
    .from("boards")
    .insert([{ boardName, accountId: account.id }])
    .select()
    .single();

  if (error) throw new Error("There was a problem in adding the new board");

  // 2. Add the columns to the column table with fields - columnName, boardId, accountId.
  const inserts = boardColumns.map((column) => {
    return {
      columnName: column.columnName,
      boardId: board.id,
      accountId: account.id,
    };
  });

  const { error: columnError } = await supabase.from("columns").insert(inserts);

  if (columnError) throw new Error("There was a problem in adding the columns");

  revalidatePath("/boards");
  redirect(`/boards/${board.id}`);
}

export async function addNewTaskAction(data) {
  const session = await auth();
  const account = await getAccount(session.user.email);
  const { taskName, taskDescription, subtasks, boardId, columnId } = data;

  const { data: task, error } = await supabase
    .from("tasks")
    .insert([
      { taskName, taskDescription, accountId: account.id, boardId, columnId },
    ])
    .select()
    .single();

  if (error) throw new Error("There was a problem in adding the new task");

  const inserts = subtasks.map((subtask) => {
    return {
      subtaskName: subtask.subtaskName,
      isChecked: false,
      accountId: account.id,
      boardId,
      columnId,
      taskId: task.id,
    };
  });

  const { error: subtaskError } = await supabase
    .from("subtasks")
    .insert(inserts);

  if (subtaskError) {
    throw new Error("There was a problem in adding the subtasks");
  }

  revalidatePath(`/boards/${boardId}`);
}

export async function updateBoardNameAction(data) {
  const { updatedBoardName, boardId } = data;

  const { error } = await supabase
    .from("boards")
    .update({ boardName: updatedBoardName })
    .eq("id", boardId);

  if (error) {
    throw new Error("Board name could not be updated");
  }

  revalidatePath("/boards");
  revalidatePath(`/boards/${boardId}`);
}

export async function deleteBoardAction(boardId) {
  // To delete a board we have to delete -
  // 1) Subtasks from subtasks for boardId.
  const { error: subtasksError } = await supabase
    .from("subtasks")
    .delete()
    .eq("boardId", boardId);

  if (subtasksError) {
    console.error("##deletBoardAction subtasks error:", subtasksError);
    throw new Error("Subtasks could not be deleted");
  }

  // 2) Tasks from tasks for boardId.
  const { error: tasksError } = await supabase
    .from("tasks")
    .delete()
    .eq("boardId", boardId);

  if (tasksError) {
    console.error("##deletBoardAction tasks error:", tasksError);
    throw new Error("Tasks could not be deleted");
  }

  // 3) Columns from columns for boardID.
  const { error: columnError } = await supabase
    .from("columns")
    .delete()
    .eq("boardId", boardId);

  if (columnError) {
    console.error("##deletBoardAction col error:", columnError);
    throw new Error("Columns could not be deleted");
  }

  // 4) Board from board columns.
  const { error } = await supabase.from("boards").delete().eq("id", boardId);

  if (error) {
    console.error("##deletBoardAction board error:", error);
    throw new Error("Board could not be deleted");
  }

  revalidatePath("/boards");
  redirect("/boards");
}

export async function updateAccountAction(data) {
  const { fullName } = data;
  const session = await auth();
  const account = await getAccount(session.user.email);

  const { error } = await supabase
    .from("accounts")
    .update({ fullName })
    .eq("id", account.id);

  if (error) {
    console.log("###updateAccountAction error : ", error.message);
    throw new Error("Account could not be updated");
  }

  revalidatePath(`/boards/settings`);
  revalidatePath(`/boards`);
}

export async function addNewColumnAction({ newColumn, boardId }) {
  // Add columnName, boardId,accountId
  const session = await auth();
  const account = await getAccount(session.user.email);

  const { data, error } = await supabase
    .from("columns")
    .insert([{ columnName: newColumn, accountId: account.id, boardId }])
    .select()
    .single();

  if (error) {
    console.log("##Addnewcolumnaction error : ", error.message);
    throw new Error("There was a problem in adding the new column");
  }

  revalidatePath(`/boards/${boardId}`);
}

export async function deleteColumnAction(columnId, boardId) {
  const session = await auth();
  const account = await getAccount(session.user.email);

  // 1) Delete subtasks for the column
  const { error: subtasksError } = await supabase
    .from("subtasks")
    .delete()
    .eq("columnId", columnId)
    .eq("boardId", boardId)
    .eq("accountId", account.id);

  if (subtasksError) {
    console.error("##deleteColumnAction subtasks error:", subtasksError);
    throw new Error("Subtasks could not be deleted");
  }

  // 2) Delete tasks for the column
  const { error: tasksError } = await supabase
    .from("tasks")
    .delete()
    .eq("columnId", columnId)
    .eq("boardId", boardId)
    .eq("accountId", account.id);

  if (tasksError) {
    console.error("##deleteColumnAction tasks error:", tasksError);
    throw new Error("Tasks could not be deleted");
  }

  // 3) Delete column
  const { error } = await supabase
    .from("columns")
    .delete()
    .eq("id", columnId)
    .eq("boardId", boardId)
    .eq("accountId", account.id);

  if (error) {
    console.error("##deleteColumnAction tasks error:", error.message);
    throw new Error("Column could not be deleted");
  }

  revalidatePath(`/boards/${boardId}`);
}
