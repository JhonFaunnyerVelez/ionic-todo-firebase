import { Injectable } from '@angular/core';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { Observable } from 'rxjs';
import { Categoria } from '../core/models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriasCollection = collection(firestore, 'categorias');

  constructor() {}

  /**
   * Obtiene todas las categorías
   */
  getCategorias(): Observable<Categoria[]> {
    return new Observable(observer => {
      const unsubscribe = onSnapshot(this.categoriasCollection, (snapshot) => {
        const categorias = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Categoria));
        observer.next(categorias);
      }, (error) => {
        console.error('Error en tiempo real:', error);
        observer.error(error);
      });

      return () => unsubscribe();
    });
  }

  /**
   * Crea una nueva categoría
   */
  async createCategoria(categoria: Omit<Categoria, 'id'>): Promise<Categoria> {
    try {
      const docRef = await addDoc(this.categoriasCollection, categoria);
      return {
        id: docRef.id,
        ...categoria
      };
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    }
  }

  /**
   * Actualiza una categoría existente
   */
  async updateCategoria(id: string, categoria: Partial<Categoria>): Promise<void> {
    try {
      const docRef = doc(firestore, 'categorias', id);
      await updateDoc(docRef, categoria);
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      throw error;
    }
  }

  /**
   * Elimina una categoría existente
   */
  async deleteCategoria(id: string): Promise<void> {
    try {
      const docRef = doc(firestore, 'categorias', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      throw error;
    }
  }
}
