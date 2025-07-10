import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

export default function GameBoard() {
  const { pin } = useParams<{ pin: string }>();
  const socket = useSocket();
  const navigate = useNavigate();

  /* Si alguien abandona el lobby y la partida termina */
  useEffect(() => {
    const handleEnd = () => {
      alert("La partida ha terminado");
      navigate(`/`);
    };

    socket.on("game:ended", handleEnd);

    // ✅ Esta función SÍ es válida como retorno
    return () => {
      socket.off("game:ended", handleEnd);
    };
  }, [socket, navigate]);

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl font-extrabold">¡Partida en curso!</h1>
      <p className="text-2xl">Lobby PIN: {pin}</p>
      {/* Aquí irá tu tablero de combate, barras de salud, turnos, etc. */}
      <p className="text-sm text-neutral-400">(placeholder GameBoard)</p>
    </main>
  );
}
