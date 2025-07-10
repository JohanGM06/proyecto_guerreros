import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { joinLobby } from "../../api/lobby";
import { getWarriors } from "../../api/warrior";

export default function JoinLobby() {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [warriorId, setWarriorId] = useState(1);
  const [warriors, setWarriors] = useState<
    { Warrior_id: number; Warrior_name: string }[]
  >([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Cargar lista de guerreros
  useEffect(() => {
    getWarriors().then(({ data }) => setWarriors(data));
  }, []);

  // ✅ Unirse al lobby
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await joinLobby(pin, { name, warriorId });

      localStorage.setItem(
        "warriorsPlayer",
        JSON.stringify({ pin, name, warriorId })
      );

      navigate(`/lobby/${pin}`, { state: { isHost: false } });
    } catch (err) {
      console.error(err);
      setError(
        "Error al unirse al lobby. Verifica el código y que el guerrero esté disponible."
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-neutral-800 rounded-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center">Unirse al Lobby</h1>

        <input
          type="text"
          placeholder="PIN del lobby"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
          className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400"
        />

        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400"
        />

        <select
          value={warriorId}
          onChange={(e) => setWarriorId(Number(e.target.value))}
          className="p-3 rounded bg-neutral-700 text-white"
        >
          {warriors.map((w) => (
            <option key={w.Warrior_id} value={w.Warrior_id}>
              {w.Warrior_name}
            </option>
          ))}
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 py-3 rounded font-semibold"
        >
          Unirse
        </button>
      </form>
    </main>
  );
}
