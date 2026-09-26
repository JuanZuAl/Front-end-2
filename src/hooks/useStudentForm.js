import { useState } from "react";

const EMPTY_STUDENT = {
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hook con el estado y la validacion del formulario de estudiantes.
// El estado inicial se toma una sola vez: el modal remonta el form con una
// key por estudiante, asi que siempre arranca con los datos correctos.
export function useStudentForm(student) {
    const [formData, setFormData] = useState(() => ({
        ...EMPTY_STUDENT,
        studentId: student?.studentId ?? "",
        firstName: student?.firstName ?? "",
        lastName: student?.lastName ?? "",
        email: student?.email ?? "",
        phoneNumber: student?.phoneNumber ?? "",
    }));
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.studentId) {
            newErrors.studentId = "El ID del estudiante es obligatorio";
        }
        if (!formData.firstName.trim()) {
            newErrors.firstName = "El nombre es obligatorio";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "El apellido es obligatorio";
        }
        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        } else if (!EMAIL_REGEX.test(formData.email.trim())) {
            newErrors.email = "El correo no es valido";
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "El celular es obligatorio";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Devuelve los datos listos para enviar al servicio, o null si no son validos
    const getValidData = () => {
        if (!validate()) return null;

        return {
            studentId: Number(formData.studentId),
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phoneNumber: formData.phoneNumber.trim(),
        };
    };

    return { formData, errors, handleChange, getValidData };
}
