import { useEffect, useState } from "react";
import { useEnrollmentForm } from "../hooks/useEnrollmentForm";
import { getStudents } from "../services/studentDbService";
import { getCourses } from "../services/courseDbService";

const inputClass =
    "w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

function EnrollmentForm({ enrollment, onSubmit, onCancel, saving = false, submitText = "Guardar" }) {
    const { formData, errors, handleChange, getValidData } = useEnrollmentForm(enrollment);
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(true);
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    // Carga la lista de estudiantes para el select
    useEffect(() => {
        let active = true;

        getStudents()
            .then((data) => {
                if (active) setStudents(data);
            })
            .catch((error) => {
                console.error("Error al cargar los estudiantes:", error);
            })
            .finally(() => {
                if (active) setLoadingStudents(false);
            });

        return () => {
            active = false;
        };
    }, []);

    // Carga la lista de cursos para el select
    useEffect(() => {
        let active = true;

        getCourses()
            .then((data) => {
                if (active) setCourses(data);
            })
            .catch((error) => {
                console.error("Error al cargar los cursos:", error);
            })
            .finally(() => {
                if (active) setLoadingCourses(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const validData = getValidData();
        if (!validData) return;

        onSubmit(validData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
                <label className="block text-sm text-slate-600 mb-1">ID de la matrícula</label>
                <input
                    type="number"
                    name="enrollmentId"
                    value={formData.enrollmentId}
                    onChange={handleChange}
                    placeholder="ID de la matrícula"
                    // El id es la llave primaria: no se puede cambiar al editar
                    disabled={Boolean(enrollment)}
                    className={`${inputClass} disabled:bg-gray-100`}
                />
                {errors.enrollmentId && <p className="text-red-500 text-sm mt-1">{errors.enrollmentId}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1">Estudiante</label>
                <select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="">
                        {loadingStudents ? "Cargando estudiantes..." : "Seleccione un estudiante"}
                    </option>
                    {students.map((student) => (
                        <option key={student.studentId} value={student.studentId}>
                            {student.firstName} {student.lastName}
                        </option>
                    ))}
                </select>
                {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1">Curso</label>
                <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="">
                        {loadingCourses ? "Cargando cursos..." : "Seleccione un curso"}
                    </option>
                    {courses.map((course) => (
                        <option key={course.courseId} value={course.courseId}>
                            {course.name}
                        </option>
                    ))}
                </select>
                {errors.courseId && <p className="text-red-500 text-sm mt-1">{errors.courseId}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1">Fecha de matrícula</label>
                <input
                    type="date"
                    name="enrollmentDate"
                    value={formData.enrollmentDate}
                    onChange={handleChange}
                    className={inputClass}
                />
                {errors.enrollmentDate && <p className="text-red-500 text-sm mt-1">{errors.enrollmentDate}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1">Estado</label>
                {/* Los valores deben coincidir con el enum EnrollmentStatus del backend */}
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option value="">Selecciona un estado</option>
                    <option value="ACTIVE">Activa</option>
                    <option value="CANCELLED">Cancelada</option>
                    <option value="COMPLETED">Completada</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                    className="bg-gray-200 text-slate-700 py-2 px-4 rounded-lg hover:bg-gray-300 cursor-pointer disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                >
                    {saving ? "Guardando..." : submitText}
                </button>
            </div>
        </form>
    );
}

export default EnrollmentForm;
