import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [ pacientes, setPacientes] = useState([]) // listado de pacientes
  const [paciente, setPaciente] = useState({}) // paciente individual

  const eliminarPaciente = (id) => {
      const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id )
      setPacientes(pacientesActualizados)
  }

  useEffect(()=> {    //Comprobamos primero si hay algo en LS y sino le ponemos el arreglo vacio
    const obtenerLS = () => {
    const pacienteLS = JSON.parse(localStorage.getItem("pacientes")) ?? [];
    setPacientes(pacienteLS)
  }
    obtenerLS()
  },[]);

  useEffect(()=> {  //Colocamos los cambios de pacientes en LS
    localStorage.setItem("pacientes", JSON.stringify(pacientes))
  },[pacientes])

  return (

    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          pacientes = { pacientes } 
          setPacientes = { setPacientes }
          paciente = { paciente }
          setPaciente = {setPaciente}
        />
        <ListadoPacientes
          pacientes = { pacientes }
          setPaciente = { setPaciente }
          eliminarPaciente = { eliminarPaciente }
        />
      </div>
    
    </div>
  )
}

export default App
