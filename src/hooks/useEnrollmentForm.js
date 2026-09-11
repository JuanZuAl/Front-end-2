import { useState } from "react";

// Las claves coinciden con las columnas de la tabla enrollments en Supabase
const EMPTY_ENROLLMENT = {
    student_id: "",
    course_id: "",
    enrollment_date: "",
    status: "",
};

// Hook con el estado y la validacion del formulario de matriculas.
// El estado inicial se toma una sola vez: el modal remonta el form con una
// key por matricula, asi que siempre arranca con los datos correctos.
export function useEnrollmentForm(enrollment) {
    const [formData, setFormData] = useState(() => ({
        ...EMPTY_ENROLLMENT,
        // Los ids llegan como numero desde la BD; el select trabaja con strings
        student_id: String(enrollment?.student_id ?? ""),
        course_id: String(enrollment?.course_id ?? ""),
        enrollment_date: enrollment?.enrollment_date ?? "",
        status: enrollment?.status ?? "",
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.student_id.trim()) {
            newErrors.student_id = "El estudiante es obligatorio";
        }
        if (!formData.course_id.trim()) {
            newErrors.course_id = "El curso es obligatorio";
        }
        if (!formData.enrollment_date.trim()) {
            newErrors.enrollment_date = "La fecha de matrícula es obligatoria";
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
            student_id: Number(formData.student_id),
            course_id: Number(formData.course_id),
            enrollment_date: formData.enrollment_date.trim(),
            status: formData.status.trim(),
        };
    };

    return { formData, errors, handleChange, getValidData };
}
