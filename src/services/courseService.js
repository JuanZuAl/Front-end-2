import { supabase } from "../config/supabase";

const TABLE = "courses";


// Lista todos los cursos ordenados por id
export const getCourses = async () => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("course_id", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};


// Trae un curso puntual por su id
export const getCourseById = async (courseId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("course_id", courseId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};


// Crea un curso y devuelve el registro insertado
export const createCourse = async (newCourseData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(newCourseData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};


// Actualiza un curso y devuelve el registro actualizado
export const updateCourse = async (courseId, updatedData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updatedData)
    .eq("course_id", courseId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};


// Elimina un curso por id
export const deleteCourse = async (courseId) => {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("course_id", courseId);

  if (error) {
    throw error;
  }

  return true;
};
