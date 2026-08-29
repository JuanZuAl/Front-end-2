import MainLayout from "../Layouts/MainLayout";
import StudentTable from "../components/StudentTable";

function Students() {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Estudiantes</h1>
        <p className="text-gray-600 mb-6">Información sobre los estudiantes</p>
        <StudentTable />
      </div>
    </MainLayout>
  );
}

export default Students;