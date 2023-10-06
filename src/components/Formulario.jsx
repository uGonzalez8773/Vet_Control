import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {
  const [mascota, setMascota] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setMascota(paciente.mascota);
      setOwner(paciente.owner);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generateID = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return fecha + random;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([mascota, owner, email, fecha, sintomas].includes("")) {
      console.log("Hay un campo vacio");
      setError(true);
      return;
    }

    setError(false);

    //Objeto paciente
    const objetoPaciente = {
      mascota,
      owner,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );

      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      objetoPaciente.id = generateID();
      setPacientes([...pacientes, objetoPaciente]);
    }

    setMascota("");
    setOwner("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:2-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Formulario</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
        )}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase">
            Nombre Mascota{" "}
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={mascota}
            onChange={(e) => setMascota(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="owner" className="block text-gray-700 uppercase">
            Nombre dueño{" "}
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Nombre del dueño"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase">
            Email de contacto{" "}
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de contacto"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase">
            Fecha de Alta{" "}
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase">
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas del paciente"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
};

Formulario.propTypes = {
  pacientes: PropTypes.array.isRequired,
  setPacientes: PropTypes.array.isRequired,
  paciente: PropTypes.object.isRequired,
  setPaciente: PropTypes.object.isRequired,
};

export default Formulario;
