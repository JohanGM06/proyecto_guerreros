import { useEffect, useState } from "react";
import { createLobby } from "../../api/lobby";
import { useSocket } from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";

export default function CreateLobby() {
  const [pin, setPin] = useState<string>();
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // IIFE para lógica async
    (async () => {
      const { data } = await createLobby(); // 1️⃣ crea lobby
      setPin(data.pin);

      socket.emit("joinLobby", {
        // 2️⃣ host se une
        pin: data.pin,
        name: "HOST",
        warriorId: 1,
      });

      localStorage.setItem(
        "warriorsPlayer",
        JSON.stringify({
          pin: data.pin, // o pin ingresado
          name: "HOST", // o nombre elegido
          warriorId: 1, // o el seleccionado
        })
      );

      // 3️⃣ navegar al lobby como host 🔥
      navigate(`/lobby/${data.pin}`, { state: { isHost: true } });
    })();
    return () => {}; // deja la conexión viva
  }, [socket, navigate]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-neutral-900 text-white">
      {pin ? (
        <>
          <h2 className="text-3xl font-bold">PIN del lobby</h2>
          <p className="text-5xl tracking-widest">{pin}</p>
          <p>Comparte este código con tus amigos.</p>
        </>
      ) : (
        <p>Cargando…</p>
      )}
    </main>
  );
}
