import { useState } from "react";

const EMPTY_STUDENT = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hook con el estado y la validacion del formulario de estudiantes.
// El estado inicial se toma una sola vez: el modal remonta el form con una
// key por estudiante, asi que siempre arranca con los datos correctos.
export function useStudentForm(student) {
    const [formData, setFormData] = useState(() => ({
        ...EMPTY_STUDENT,
        first_name: student?.first_name ?? "",
        last_name: student?.last_name ?? "",
        email: student?.email ?? "",
        phone_number: student?.phone_number ?? "",
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = "El nombre es obligatorio";
        }
        if (!formData.last_name.trim()) {
            newErrors.last_name = "El apellido es obligatorio";
        }
        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        } else if (!EMAIL_REGEX.test(formData.email.trim())) {
            newErrors.email = "El correo no es valido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Devuelve los datos listos para enviar al servicio, o null si no son validos
    const getValidData = () => {
        if (!validate()) return null;

        return {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            email: formData.email.trim(),
            phone_number: formData.phone_number.trim(),
        };
    };

    return { formData, errors, handleChange, getValidData };
}
