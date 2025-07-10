import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-extrabold">Warriors_Lobby</h1>

      <div className="flex gap-4">
        <Link
          to="/create"
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold transition"
        >
          Crear lobby
        </Link>

        <Link
          to="/join"
          className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-semibold transition"
        >
          Unirse_a_lobby
        </Link>
      </div>
    </main>
  );
}
