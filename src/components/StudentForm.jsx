import { useStudentForm } from "../hooks/useStudentForm";

const inputClass =
    "w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

function StudentForm({ student, onSubmit, onCancel, saving = false, submitText = "Guardar" }) {
    const { formData, errors, handleChange, getValidData } = useStudentForm(student);

    const handleSubmit = (event) => {
        event.preventDefault();

        const validData = getValidData();
        if (!validData) return;

        onSubmit(validData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm text-slate-600 mb-1"></label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className={inputClass}
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1"></label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className={inputClass}
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1"></label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo"
                    className={inputClass}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1"></label>
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Celular"
                    className={inputClass}
                />
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

export default StudentForm;
