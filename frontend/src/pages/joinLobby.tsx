/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import socket from "../socket";

function JoinLobby() {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [warriorId, setWarriorId] = useState<number>(0);
  const [warriors, setWarriors] = useState<any[]>([]);
  const navigate = useNavigate();

  // Obtener lista de guerreros
  useEffect(() => {
    fetch("http://localhost:4000/api/warriors")
      .then((res) => res.json())
      .then((data) => setWarriors(data));
  }, []);

  const handleJoinLobby = () => {
    if (!pin || !name || !warriorId) {
      alert("Completa todos los campos.");
      return;
    }

    // ✅ Asegurarse de que NO sea el creador
    localStorage.removeItem("isCreator");

    // Guardar nombre para usar en el lobby
    localStorage.setItem("myName", name);

    socket.emit("joinLobby", {
      pin,
      name,
      warriorId: Number(warriorId),
    });
  };

  useEffect(() => {
    socket.on("lobby:update", (players) => {
      console.log("Jugadores:", players);
      alert("Unido al lobby");
      navigate(`/lobby/${pin}`);
    });

    socket.on("lobby:error", (err) => {
      alert("❌ " + err.message);
    });

    return () => {
      socket.off("lobby:update");
      socket.off("lobby:error");
    };
  }, [pin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-800 text-white gap-4">
      <h1 className="text-3xl">🎮 Unirse a un Lobby</h1>

      <input
        type="text"
        placeholder="Código del lobby"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="px-4 py-2 text-black rounded-md"
      />

      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 text-black rounded-md"
      />

      <select
        value={warriorId}
        onChange={(e) => setWarriorId(Number(e.target.value))}
        className="px-4 py-2 text-black rounded-md"
      >
        <option value={0}>Selecciona tu guerrero</option>
        {warriors.map((w) => (
          <option key={w.Warrior_id} value={w.Warrior_id}>
            {w.Warrior_name}
          </option>
        ))}
      </select>

      <button
        onClick={handleJoinLobby}
        className="px-6 py-3 bg-white text-purple-800 rounded-lg hover:bg-gray-200"
      >
        Unirse
      </button>

      <Link
        to="/"
        className="mt-4 text-base underline text-white hover:text-purple-300"
      >
        Cancelar y volver al inicio
      </Link>
    </div>
  );
}

export default JoinLobby;
