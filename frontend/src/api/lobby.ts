import { api } from ".";

export const createLobby = () => api.post("/lobbies");
export const joinLobby = (
  pin: string,
  body: { name: string; warriorId: number }
) => api.post(`/lobbies/${pin}/join`, body);
export const getLobby = (pin: string) => api.get(`/lobbies/${pin}`);
