import { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import CourseTable from "../components/CourseTable";
import EditCourseModal from "../components/EditCourseModal";
import Header from "../components/Header";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseDbService";

// La tabla usa course_id, pero dejamos id como respaldo
const getCourseId = (course) => course?.courseId ?? course?.id;

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const isModalOpen = isCreateOpen || Boolean(editingCourse);


  useEffect(() => {
    let active = true;

    getCourses()
      .then((data) => {
        if (!active) return;
        setCourses(data);
        setListError(null);
      })
      .catch((error) => {
        if (!active) return;
        console.error("Error al cargar los cursos:", error);
        setListError("No se pudieron cargar los cursos.");
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

  const handleEdit = (course) => {
    setSaveError(null);
    setEditingCourse(course);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setIsCreateOpen(false);
    setEditingCourse(null);
    setSaveError(null);
  };

  // Un mismo modal sirve para crear y para editar
  const handleSaveStudent = async (formData) => {
    try {
      setSaving(true);
      setSaveError(null);

      if (editingCourse) {
        const courseId = getCourseId(editingCourse);
        const updated = await updateCourse(courseId, formData);
        setCourses((prev) =>
          prev.map((course) =>
            getCourseId(course) === courseId
              ? { ...course, ...(updated ?? formData) }
              : course
          )
        );
      } else {
        const created = await createCourse(formData);
        setCourses((prev) => [...prev, created]);
      }

      setIsCreateOpen(false);
      setEditingCourse(null);
    } catch (error) {
      console.error("Error al guardar el curso:", error);
      setSaveError(error.message ?? "No se pudo guardar el curso.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!courseId) return;
    if (!window.confirm("Seguro que deseas eliminar este curso?")) return;

    try {
      setDeletingId(courseId);
      setListError(null);
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => getCourseId(course) !== courseId));
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      setListError("No se pudo eliminar el curso.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <Header
          title="Cursos"
          txtButton="Agregar Curso"
          description="Agregar un nuevo curso al sistema"
          onButtonClick={handleOpenCreate}
        />

        <EditCourseModal
          isOpen={isModalOpen}
          course={editingCourse}
          onClose={handleCloseModal}
          onSave={handleSaveStudent}
          saving={saving}
          error={saveError}
        />

        <CourseTable
          courses={courses}
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

export default Courses;
