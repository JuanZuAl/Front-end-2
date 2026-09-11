import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";

function Dashboard() {

  return (
      <MainLayout >
        <div className=" flex  flex-col p-6">
          <Header title="Dashboard" description="Resumen de las actividades del sistema" />
        </div>
      </MainLayout>
  );
}

export default Dashboard