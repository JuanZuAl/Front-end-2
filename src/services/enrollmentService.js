import { supabase } from "../config/supabase";

const TABLE = "enrollments";

// Lista todos los estudiantes ordenados por id
export const getEnrollments = async () => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("enrollment_id", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

// Trae un estudiante puntual por su id
export const getEnrollmentById = async (enrollmentId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("enrollment_id", enrollmentId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Crea un estudiante y devuelve el registro insertado
export const createEnrollment = async (newEnrollmentData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(newEnrollmentData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Actualiza un estudiante y devuelve el registro actualizado
export const updateEnrollment = async (enrollmentId, updatedData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updatedData)
    .eq("enrollment_id", enrollmentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Elimina un estudiante por id
export const deleteEnrollment = async (enrollmentId) => {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("enrollment_id", enrollmentId);

  if (error) {
    throw error;
  }

  return true;
};
