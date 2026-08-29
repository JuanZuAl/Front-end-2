import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";

function StudentTable() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error("Error al cargar los estudiantes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleEdit = (student) => {
        console.log("Editar estudiante:", student);
    };

    const handleDelete = async (studentId) => {
        if (!studentId) return;

        try {
            await deleteStudent(studentId);
            setStudents((prev) => prev.filter((student) => (student.student_id ?? student.id) !== studentId));
        } catch (error) {
            console.error("Error al eliminar estudiante:", error);
        }
    };

    if (loading) {
        return <p className="text-gray-500">Cargando estudiantes...</p>;
    }

    if (!students.length) {
        return (
            <div className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 bg-white">
                No hay estudiantes registrados.
            </div>
        );
    }

    return (
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
                    <tr key={student.student_id ?? student.id} className="border-t border-gray-300">
                        <td className="p-4 border-t border-gray-300 border-b">{student.first_name}</td>
                        <td className="p-4 border-t border-gray-300 border-b">{student.last_name}</td>
                        <td className="p-4 border-t border-gray-300 border-b">{student.email}</td>
                        <td className="p-4 border-t border-gray-300 border-b">{student.phone_number}</td>
                        <td className="p-4 border-t border-gray-300 border-b text-center">
                            <button onClick={() => handleEdit(student)} className="bg-blue-500 text-white p-2 rounded mr-2">Editar</button>
                            <button onClick={() => handleDelete(student.student_id ?? student.id)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentTable;