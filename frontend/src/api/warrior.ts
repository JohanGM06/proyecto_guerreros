import { api } from ".";

export const getWarriors = () =>
  api.get<{ Warrior_id: number; Warrior_name: string }[]>("/warriors");
