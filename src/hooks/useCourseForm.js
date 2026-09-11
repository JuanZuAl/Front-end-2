import { useState } from "react";

const EMPTY_COURSE = {
    code: "",
    name: "",
    description: "",
    max_capacity: "",
};

export function useCourseForm(course) {
    const [formData, setFormData] = useState(() => ({
        ...EMPTY_COURSE,
        code: course?.code ?? "",
        name: course?.name ?? "",
        description: course?.description ?? "",
        // La capacidad llega como numero desde la BD; el input trabaja con strings
        max_capacity: String(course?.max_capacity ?? ""),
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.code.trim()) {
            newErrors.code = "El código es obligatorio";
        }
        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        }
        if (!formData.description.trim()) {
            newErrors.description = "La descripción es obligatoria";
        }
        if (!formData.max_capacity.trim()) {
            newErrors.max_capacity = "La capacidad máxima es obligatoria";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Devuelve los datos listos para enviar al servicio, o null si no son validos
    const getValidData = () => {
        if (!validate()) return null;

        return {
            code: formData.code.trim(),
            name: formData.name.trim(),
            description: formData.description.trim(),
            max_capacity: Number(formData.max_capacity),
        };
    };

    return { formData, errors, handleChange, getValidData };
}
