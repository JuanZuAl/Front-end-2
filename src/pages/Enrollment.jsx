import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
function Enrollment() {
    return (
      <MainLayout>
        <div className=" flex  flex-col p-6">
          <Header title="Inscripciones" txtButton="Agregar Inscripción" description="Agregar una nueva inscripción al sistema" />
        </div>
      </MainLayout>
    );
}

export default Enrollment;