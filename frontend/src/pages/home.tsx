import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-800 text-white text-3xl gap-4">
      <h1>🏠 Página principal</h1>
      <Link
        to="/create"
        className="px-6 py-3 bg-white text-green-800 rounded-lg shadow-md hover:bg-gray-200 transition"
      >
        Crear un lobby
      </Link>
      <Link
        to="/join"
        className="px-6 py-3 bg-white text-green-800 rounded-lg shadow-md hover:bg-gray-200 transition"
      >
        Unirse a un lobby
      </Link>
    </div>
  );
}

export default Home;
