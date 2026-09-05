import { useEffect } from "react";
import StudentForm from "./StudentForm";

function EditStudentModal({ isOpen, student, onClose, onSave, saving = false, error = null }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isEditing = Boolean(student);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg bg-white rounded-lg shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b border-gray-200 p-4">
                    <h2 className="text-xl font-bold text-slate-800">
                        {isEditing ? "Editar estudiante" : "Agregar estudiante"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-800 text-2xl leading-none cursor-pointer"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    {error && (
                        <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                            {error}
                        </p>
                    )}

                    <StudentForm
                        key={student ? student.student_id ?? student.id : "new"}
                        student={student}
                        onSubmit={onSave}
                        onCancel={onClose}
                        saving={saving}
                        submitText={isEditing ? "Guardar cambios" : "Agregar estudiante"}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditStudentModal;
