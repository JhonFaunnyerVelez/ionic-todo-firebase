import { Categoria } from "./categoria.model";

export interface Tarea {
  id: string;
  descripcion: string;
  completa: boolean;
  keyCategoriaID: string;
}