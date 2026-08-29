import { supabase } from "../config/supabase";

export const getStudents = async () => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("student_id", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const deleteStudent = async (studentId) => {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("student_id", studentId);

  if (error) {
    throw error;
  }

  return true;
};
