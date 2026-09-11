import { useCourseForm } from "../hooks/useCourseForm";

const inputClass =
    "w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

function CourseForm({ course, onSubmit, onCancel, saving = false, submitText = "Guardar" }) {
    const { formData, errors, handleChange, getValidData } = useCourseForm(course);

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
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Codigo"
                    className={inputClass}
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1"></label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className={inputClass}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1"></label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                    className={inputClass}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
                <label className="block text-sm text-slate-600 mb-1"></label>
                <input
                    type="number"
                    name="max_capacity"
                    value={formData.max_capacity}
                    onChange={handleChange}
                    placeholder="Capacidad Máxima"
                    className={inputClass}
                />
                {errors.max_capacity && <p className="text-red-500 text-sm mt-1">{errors.max_capacity}</p>}
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

export default CourseForm;
