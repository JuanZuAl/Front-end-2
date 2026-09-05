import { supabase } from "../config/supabase";

const TABLE = "students";

// Lista todos los estudiantes ordenados por id
export const getStudents = async () => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("student_id", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

// Trae un estudiante puntual por su id
export const getStudentById = async (studentId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("student_id", studentId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Crea un estudiante y devuelve el registro insertado
export const createStudent = async (newStudentData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(newStudentData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Actualiza un estudiante y devuelve el registro actualizado
export const updateStudent = async (studentId, updatedData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updatedData)
    .eq("student_id", studentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Elimina un estudiante por id
export const deleteStudent = async (studentId) => {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("student_id", studentId);

  if (error) {
    throw error;
  }

  return true;
};
