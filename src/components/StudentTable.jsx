const getStudentId = (student) => student?.student_id ?? student?.id;

function StudentTable({ students = [], loading = false, listError = null, deletingId = null, onEdit, onDelete }) {
    if (loading) {
        return <p className="text-gray-500">Cargando estudiantes...</p>;
    }

    return (
        <>
            {listError && (
                <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                    {listError}
                </p>
            )}

            {!students.length ? (
                <div className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-white">
                    No hay estudiantes registrados.
                </div>
            ) : (
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-4">Nombre</th>
                            <th className="text-left p-4">Apellido</th>
                            <th className="text-left p-4">Correo</th>
                            <th className="text-left p-4">Celular</th>
                            <th className="text-center p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={getStudentId(student)} className="border-t border-gray-300">
                                <td className="p-4 border-t border-gray-300 border-b">{student.first_name}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{student.last_name}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{student.email}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{student.phone_number}</td>
                                <td className="p-4 border-t border-gray-300 border-b text-center">
                                    <button
                                        onClick={() => onEdit(student)}
                                        className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-700 cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(getStudentId(student))}
                                        disabled={deletingId === getStudentId(student)}
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 cursor-pointer disabled:opacity-50"
                                    >
                                        {deletingId === getStudentId(student) ? "Eliminando..." : "Eliminar"}
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

export default StudentTable;
