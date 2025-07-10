import { Warrior } from "../models";

export const listWarriors = () =>
  Warrior.findAll({
    attributes: ["Warrior_id", "Warrior_name"],
  });
