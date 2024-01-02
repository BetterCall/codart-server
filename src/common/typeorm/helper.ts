import { Raw } from "typeorm";
export const searchQuery = (term: string) => Raw(alias => `${alias} LIKE '%${term}%'`)