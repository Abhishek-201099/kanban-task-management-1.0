import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

// Get account
export async function getAccount(email) {
  let { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

// Create account
export async function createAccount({ email, fullName }) {
  const { data, error } = await supabase
    .from("accounts")
    .insert([{ email, fullName }])
    .select();

  if (error) throw new Error("There was an error in creating account");

  return data;
}

// Get all boards for user
export async function getBoards(accountId) {
  let { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("accountId", accountId)
    .order("created_at");

  if (error) {
    throw new Error("There was an error in getting boards");
  }

  return data;
}

export async function getBoard(boardId) {
  let { data: board, error } = await supabase
    .from("boards")
    .select("*")
    .eq("id", boardId)
    .single();

  if (error) {
    console.log("##getBoard : ", error.message);
    throw new Error("There was an error in getting the board");
  }

  revalidatePath(`/boards/${boardId}`);

  return board;
}

export async function getBoardColumns(boardId) {
  let { data: columns, error } = await supabase
    .from("columns")
    .select("*")
    .eq("boardId", boardId);

  if (error) {
    console.log("###getBoardColumns error : ", error.message);
    throw new Error("There was an error in getting the board columns");
  }

  return columns;
}

export async function getTasks(accountId, boardId) {
  let { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("accountId", accountId)
    .eq("boardId", boardId)
    .order("created_at");

  if (error) {
    console.log("###GetTasks error : ", error.message);
    throw new Error("There was an error in getting tasks");
  }

  return tasks;
}

export async function getSubtasksForTask(boardId, accountId) {
  // taskId, columnId, boardId, accountId
  let { data: subtasks, error } = await supabase
    .from("subtasks")
    .select("*")
    .eq("boardId", boardId)
    .eq("accountId", accountId);

  if (error) {
    console.log("###GetSubtasks error : ", error.message);
    throw new Error("There was an error in getting subtasks");
  }

  return subtasks;
}
