import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";

function Courses() {
    return (
      <MainLayout>
        <div className=" flex  flex-col p-6">
          <Header title="Cursos" txtButton="Agregar Curso" description="Agregar un nuevo curso al sistema" />
        </div>
      </MainLayout>
    );
}

export default Courses;