const getCourseId = (course) => course?.courseId ?? course?.id;

function CourseTable({ courses = [], loading = false, listError = null, deletingId = null, onEdit, onDelete }) {
    if (loading) {
        return <p className="text-gray-500">Cargando cursos...</p>;
    }

    return (
        <>
            {listError && (
                <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                    {listError}
                </p>
            )}

            {!courses.length ? (
                <div className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-white">
                    No hay cursos registrados.
                </div>
            ) : (
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-4">Id</th>
                            <th className="text-left p-4">Codigo</th>
                            <th className="text-left p-4">Nombre</th>
                            <th className="text-left p-4">Descripción</th>
                            <th className="text-left p-4">Capacidad Máxima</th>
                            <th className="text-center p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={getCourseId(course)} className="border-t border-gray-300">
                                <td className="p-4 border-t border-gray-300 border-b">{getCourseId(course)}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{course.code}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{course.name}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{course.description}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{course.maxCapacity}</td>
                                <td className="p-4 border-t border-gray-300 border-b text-center">
                                    <button
                                        onClick={() => onEdit(course)}
                                        className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-700 cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(getCourseId(course))}
                                        disabled={deletingId === getCourseId(course)}
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 cursor-pointer disabled:opacity-50"
                                    >
                                        {deletingId === getCourseId(course) ? "Eliminando..." : "Eliminar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default CourseTable;