function StudentTable({students, onEdit, onDelete}) {
    return (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
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
                    <tr key={student.student_id} className="border-t border-gray-300">
                        <td className="p-4 border-t border-gray-300 border-b">{student.first_name}</td>
                        <td className="p-4 border-t border-gray-300 border-b">{student.last_name}</td>
                        <td className="p-4 border-t border-gray-300 border-b">{student.email}</td>
                        <td className="p-4 border-t border-gray-300 border-b">{student.phone_number}</td>
                        <td className="p-4 border-t border-gray-300 border-b text-center">
                            <button onClick={() => onEdit(student)} className="bg-blue-500 text-white p-2 rounded mr-2">Editar</button>
                            <button onClick={() => onDelete(student.student_id)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentTable;