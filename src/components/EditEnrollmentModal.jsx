import { useEffect } from "react";
import EnrollmentForm from "./EnrollmentForm";


function EditEnrollmentModal({ isOpen, enrollment, onClose, onSave, saving = false, error = null }) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isEditing = Boolean(enrollment);

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
                        {isEditing ? "Editar Matrícula" : "Agregar Matrícula"}
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

                    <EnrollmentForm
                        key={enrollment ? enrollment.enrollment_id ?? enrollment.id : "new"}
                        enrollment={enrollment}
                        onSubmit={onSave}
                        onCancel={onClose}
                        saving={saving}
                        submitText={isEditing ? "Guardar cambios" : "Agregar matrícula"}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditEnrollmentModal;
