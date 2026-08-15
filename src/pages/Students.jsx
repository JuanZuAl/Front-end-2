//import {getStudents} from '../services/studentService';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';


function Students() {
    return (
        <div className="min-h-screen flex flex-col ">
            <header>
                    <Nav />
                    <Header 
                    title="Estudiantes" 
                    description="Todos los estudiantes"
                    txtButton="Agregar Estudiante"
                    />
            </header>
            <main className="flex-1 p-4">
        
            </main>
        <footer className="mt-4">
            <Footer />
        </footer >
        </div>
    );
}

export default Students;