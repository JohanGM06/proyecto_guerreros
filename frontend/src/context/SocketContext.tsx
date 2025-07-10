/* eslint react-refresh/only-export-components: "off" */

import { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

const SocketCtx = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useMemo(
    () => io(import.meta.env.VITE_API_URL!.replace("/api", "")),
    []
  );

  return <SocketCtx.Provider value={socket}>{children}</SocketCtx.Provider>;
}

export const useSocket = () => {
  const sock = useContext(SocketCtx);
  if (!sock) throw new Error("useSocket must be inside <SocketProvider>");
  return sock;
};
