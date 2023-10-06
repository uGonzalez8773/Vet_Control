import Paciente from "./Paciente";
import PropTypes from "prop-types";
//import { useEffect } from "react";

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente}) => {

/*   useEffect(()=> {
    if(pacientes.length > 0) {console.log('Nuevo paciente')}
  }, [pacientes])
 */
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra los {""}
            <span className="text-indigo-600 font-bold ">
              Pacientes y citas
            </span>
          </p>

          {pacientes.map((paciente) => (
            <Paciente 
              key={paciente.id} 
              paciente={paciente} 
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
              />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Agrega pacientes para {""}
            <span className="text-indigo-600 font-bold ">
              verlos, editarlos y eliminarlos aqui
            </span>
          </p>
        </>
      )}
    </div>
  );
};

ListadoPacientes.propTypes = {
  pacientes: PropTypes.array.isRequired,
  setPaciente: PropTypes.func.isRequired,
  eliminarPaciente: PropTypes.func.isRequired,
};

export default ListadoPacientes;
