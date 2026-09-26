import { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import EnrollmentTable from "../components/EnrollmentTable";
import EditEnrollmentModal from "../components/EditEnrollmentModal";
import Header from "../components/Header";
import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../services/enrollmentDbService";

const getEnrollmentId = (enrollment) => enrollment?.enrollmentId ?? enrollment?.id;

function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState(null);

  const isModalOpen = isCreateOpen || Boolean(editingEnrollment);

  // Carga inicial: los setState viven en los callbacks de la promesa
  useEffect(() => {
    let active = true;

    getEnrollments()
      .then((data) => {
        if (!active) return;
        setEnrollments(data);
        setListError(null);
      })
      .catch((error) => {
        if (!active) return;
        console.error("Error al cargar las matrículas:", error);
        setListError("No se pudieron cargar las matrículas.");
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

  const handleEdit = (enrollment) => {
    setSaveError(null);
    setEditingEnrollment(enrollment);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setIsCreateOpen(false);
    setEditingEnrollment(null);
    setSaveError(null);
  };

  // Un mismo modal sirve para crear y para editar
  const handleSaveEnrollment = async (formData) => {
    try {
      setSaving(true);
      setSaveError(null);

      if (editingEnrollment) {
        const enrollmentId = getEnrollmentId(editingEnrollment);
        const updated = await updateEnrollment(enrollmentId, formData);
        setEnrollments((prev) =>
          prev.map((enrollment) =>
            getEnrollmentId(enrollment) === enrollmentId
              ? { ...enrollment, ...(updated ?? formData) }
              : enrollment
          )
        );
      } else {
        const created = await createEnrollment(formData);
        setEnrollments((prev) => [...prev, created]);
      }

      setIsCreateOpen(false);
      setEditingEnrollment(null);
    } catch (error) {
      console.error("Error al guardar la matrícula:", error);
      // El backend devuelve el motivo del error como texto en el body
      // (los errores que maneja Spring por defecto llegan como objeto con "message")
      const data = error.response?.data;
      const message = typeof data === "string" ? data : data?.message;
      setSaveError(message ?? error.message ?? "No se pudo guardar la matrícula.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (enrollmentId) => {
    if (!enrollmentId) return;
    if (!window.confirm("Seguro que deseas eliminar esta matrícula?")) return;

    try {
      setDeletingId(enrollmentId);
      setListError(null);
      await deleteEnrollment(enrollmentId);
      setEnrollments((prev) => prev.filter((enrollment) => getEnrollmentId(enrollment) !== enrollmentId));
    } catch (error) {
      console.error("Error al eliminar la matrícula:", error);
      setListError("No se pudo eliminar la matrícula.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <Header
          title="Matriculas"
          txtButton="Agregar Matricula"
          description="Agregar una nueva matrícula al sistema"
          onButtonClick={handleOpenCreate}
        />

        <EditEnrollmentModal
          isOpen={isModalOpen}
          enrollment={editingEnrollment}
          onClose={handleCloseModal}
          onSave={handleSaveEnrollment}
          saving={saving}
          error={saveError}
        />

        <EnrollmentTable
          enrollments={enrollments}
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

export default Enrollment;
