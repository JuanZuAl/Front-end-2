import { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import StudentTable from "../components/StudentTable";
import EditStudentModal from "../components/EditStudentModal";
import Header from "../components/Header";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

// La tabla usa student_id, pero dejamos id como respaldo
const getStudentId = (student) => student?.student_id ?? student?.id;

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const isModalOpen = isCreateOpen || Boolean(editingStudent);

  // Carga inicial: los setState viven en los callbacks de la promesa
  useEffect(() => {
    let active = true;

    getStudents()
      .then((data) => {
        if (!active) return;
        setStudents(data);
        setListError(null);
      })
      .catch((error) => {
        if (!active) return;
        console.error("Error al cargar los estudiantes:", error);
        setListError("No se pudieron cargar los estudiantes.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleOpenCreate = () => {
    setSaveError(null);
    setIsCreateOpen(true);
  };

  const handleEdit = (student) => {
    setSaveError(null);
    setEditingStudent(student);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setIsCreateOpen(false);
    setEditingStudent(null);
    setSaveError(null);
  };

  // Un mismo modal sirve para crear y para editar
  const handleSaveStudent = async (formData) => {
    try {
      setSaving(true);
      setSaveError(null);

      if (editingStudent) {
        const studentId = getStudentId(editingStudent);
        const updated = await updateStudent(studentId, formData);
        setStudents((prev) =>
          prev.map((student) =>
            getStudentId(student) === studentId
              ? { ...student, ...(updated ?? formData) }
              : student
          )
        );
      } else {
        const created = await createStudent(formData);
        setStudents((prev) => [...prev, created]);
      }

      setIsCreateOpen(false);
      setEditingStudent(null);
    } catch (error) {
      console.error("Error al guardar el estudiante:", error);
      setSaveError(error.message ?? "No se pudo guardar el estudiante.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (!studentId) return;
    if (!window.confirm("Seguro que deseas eliminar este estudiante?")) return;

    try {
      setDeletingId(studentId);
      setListError(null);
      await deleteStudent(studentId);
      setStudents((prev) => prev.filter((student) => getStudentId(student) !== studentId));
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
      setListError("No se pudo eliminar el estudiante.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <Header
          title="Estudiantes"
          txtButton="Agregar Estudiante"
          description="Agregar un nuevo estudiante al sistema"
          onButtonClick={handleOpenCreate}
        />

        <EditStudentModal
          isOpen={isModalOpen}
          student={editingStudent}
          onClose={handleCloseModal}
          onSave={handleSaveStudent}
          saving={saving}
          error={saveError}
        />

        <StudentTable
          students={students}
          loading={loading}
          listError={listError}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </MainLayout>
  );
}

export default Students;
