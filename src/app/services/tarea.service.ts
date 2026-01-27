import { Injectable } from '@angular/core';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { Observable } from 'rxjs';
import { Tarea } from '../core/models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareasCollection = collection(firestore, 'tareas');

  constructor() {}

  /**
   * Obtiene todas las tareas
   */
  getTareas(): Observable<Tarea[]> {
    return new Observable(observer => {
      const unsubscribe = onSnapshot(this.tareasCollection, (snapshot) => {
        const tareas = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            fechaCreacion: data['fechaCreacion']?.toDate() || new Date()
          } as Tarea;
        });
        
        // Ordenar por fecha de creación DESC (más reciente primero)
        tareas.sort((a, b) => b.fechaCreacion.getTime() - a.fechaCreacion.getTime());
        
        observer.next(tareas);
      }, (error) => {
        console.error('Error en tiempo real:', error);
        observer.error(error);
      });

      return () => unsubscribe();
    });
  }

  /**
   * Crea una nueva tarea
   */
  async createTarea(tarea: Omit<Tarea, 'id'>): Promise<Tarea> {
    try {
      console.log('Tarea recibida en createTarea:', tarea);
     
      // Usar directamente el valor sin nullish coalescing
      const tareaParaGuardar = {
        ...tarea,
        completa: tarea.completa, // Usar el valor directamente
        fechaCreacion: new Date(),
        id: '' // Se agregará después de crear el documento
      };
      
      console.log('Tarea para guardar:', tareaParaGuardar);
      
      const docRef = await addDoc(this.tareasCollection, tareaParaGuardar);
      
      // Actualizar el documento con su propio ID
      await updateDoc(docRef, { id: docRef.id });
      
      return {
        id: docRef.id,
        ...tarea,
        completa: tarea.completa, // Usar el valor directamente
        fechaCreacion: new Date()
      };
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw error;
    }
  }

  /**
   * Actualiza una tarea existente
   */
  async updateTarea(id: string, tarea: Partial<Tarea>): Promise<void> {
    try {
      const docRef = doc(firestore, 'tareas', id);
      await updateDoc(docRef, tarea);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw error;
    }
  }

  /**
   * Elimina una tarea existente
   */
  async deleteTarea(id: string): Promise<void> {
    try {
      const docRef = doc(firestore, 'tareas', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw error;
    }
  }

  /**
   * Cambia el estado de una tarea
   */
  async toggleCompletada(id: string, completa: boolean): Promise<void> {
    try {
      const docRef = doc(firestore, 'tareas', id);
      await updateDoc(docRef, { completa });
    } catch (error) {
      console.error('Error al cambiar estado de tarea:', error);
      throw error;
    }
  }
}
