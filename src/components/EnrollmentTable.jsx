const getEnrollmentId = (enrollment) => enrollment?.enrollment_id ?? enrollment?.id;

function EnrollmentTable({ enrollments = [], loading = false, listError = null, deletingId = null, onEdit, onDelete }) {
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

            {!enrollments.length ? (
                <div className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-white">
                    No hay matrículas registradas.
                </div>
            ) : (
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-4">Id</th>
                            <th className="text-left p-4">Id del estudiante</th>
                            <th className="text-left p-4">Id del curso</th>
                            <th className="text-left p-4">Fecha de matrícula</th>
                            <th className="text-left p-4">Estado</th>
                            <th className="text-center p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment) => (
                            <tr key={getEnrollmentId(enrollment)} className="border-t border-gray-300">
                                <td className="p-4 border-t border-gray-300 border-b">{getEnrollmentId(enrollment)}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{enrollment.student_id}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{enrollment.course_id}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{enrollment.enrollment_date}</td>
                                <td className="p-4 border-t border-gray-300 border-b">{enrollment.status}</td>
                                <td className="p-4 border-t border-gray-300 border-b text-center">
                                    <button
                                        onClick={() => onEdit(enrollment)}
                                        className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-700 cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(getEnrollmentId(enrollment))}
                                        disabled={deletingId === getEnrollmentId(enrollment)}
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 cursor-pointer disabled:opacity-50"
                                    >
                                        {deletingId === getEnrollmentId(enrollment) ? "Eliminando..." : "Eliminar"}
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

export default EnrollmentTable;
