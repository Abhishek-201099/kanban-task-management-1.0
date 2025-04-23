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
    .eq("accountId", accountId);

  if (error) {
    throw new Error("There was an error in getting boards");
  }

  return data;
}
