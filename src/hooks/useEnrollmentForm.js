import { useState } from "react";

// Las claves coinciden con las columnas de la tabla enrollments en Supabase
const EMPTY_ENROLLMENT = {
    enrollmentId: "",
    studentId: "",
    courseId: "",
    enrollmentDate: "",
    status: "",
};

// Hook con el estado y la validacion del formulario de matriculas.
// El estado inicial se toma una sola vez: el modal remonta el form con una
// key por matricula, asi que siempre arranca con los datos correctos.
export function useEnrollmentForm(enrollment) {
    const [formData, setFormData] = useState(() => ({
        ...EMPTY_ENROLLMENT,
        // Los ids llegan como numero desde la BD; el select trabaja con strings
        enrollmentId: String(enrollment?.enrollmentId ?? ""),
        studentId: String(enrollment?.studentId ?? ""),
        courseId: String(enrollment?.courseId ?? ""),
        enrollmentDate: enrollment?.enrollmentDate ?? "",
        status: enrollment?.status ?? "",
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.enrollmentId.trim()) {
            newErrors.enrollmentId = "El ID de la matrícula es obligatorio";
        }
        if (!formData.studentId.trim()) {
            newErrors.studentId = "El estudiante es obligatorio";
        }
        if (!formData.courseId.trim()) {
            newErrors.courseId = "El curso es obligatorio";
        }
        if (!formData.enrollmentDate.trim()) {
            newErrors.enrollmentDate = "La fecha de matrícula es obligatoria";
        }
        if (!formData.status.trim()) {
            newErrors.status = "El estado es obligatorio";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Devuelve los datos listos para enviar al servicio, o null si no son validos
    const getValidData = () => {
        if (!validate()) return null;

        return {
            enrollmentId: Number(formData.enrollmentId),
            studentId: Number(formData.studentId),
            courseId: Number(formData.courseId),
            enrollmentDate: formData.enrollmentDate.trim(),
            status: formData.status.trim(),
        };
    };

    return { formData, errors, handleChange, getValidData };
}
