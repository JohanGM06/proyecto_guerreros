import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

function CreateLobby() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("createLobby");

    socket.on("lobbyCreated", ({ lobbyId }) => {
      try {
        // Guardar que este usuario es el creador del lobby
        localStorage.setItem("isCreator", "true");

        // Confirmar que se guardó correctamente
        const confirm = localStorage.getItem("isCreator");
        console.log("✅ isCreator en localStorage:", confirm);

        // Navegar al lobby
        navigate(`/lobby/${lobbyId}`);
      } catch (err) {
        alert("❌ Error al guardar 'isCreator' en localStorage.");
        console.error(err);
      }
    });

    socket.on("lobby:error", (err) => {
      alert("❌ " + err.message);
    });

    return () => {
      socket.off("lobbyCreated");
      socket.off("lobby:error");
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white gap-4">
      <h1 className="text-4xl font-bold">⏳ Creando lobby...</h1>
      <p className="text-lg">Por favor espera unos segundos</p>
    </div>
  );
}

export default CreateLobby;
