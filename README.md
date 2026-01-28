# Ionic Todo Firebase

Aplicación móvil híbrida para gestión de tareas y categorías con Firebase, desarrollada con Ionic y Angular.

ionic cordova platform rm ios
rm -rf plugins
ionic cordova platform add ios
ionic cordova prepare ios
ionic cordova run ios


ng build --configuration web
firebase deploy


## 📱 Características

- ✅ CRUD completo de categorías en tiempo real
- ✅ CRUD completo de tareas con búsqueda y filtrado
- ✅ Base de datos Firestore con actualizaciones automáticas
- ✅ Interfaz moderna con Ionic Framework
- ✅ Diseño responsive y optimizado para móviles
- ✅ Action sheets para gestión de categorías y tareas
- ✅ Formularios modales con validación
- ✅ Iconos optimizados para ionicons v7
- ✅ Buscador de tareas con filtrado en tiempo real
- ✅ Infinite scroll para mejor rendimiento
- ✅ Componentes reutilizables y modulares
- ✅ Contador de tareas dinámico
- ✅ Generador automático de tareas de prueba

## Tecnologías

- **Frontend**: Ionic + Angular 20
- **Base de datos**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Icons**: Ionicons v7
- **Build Tool**: Angular CLI + Vite

## Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase (opcional para desarrollo local)

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/JhonFaunnyerVelez/ionic-todo-firebase.git
   cd ionic-todo-firebase
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase (opcional)**
   - Si quieres usar tu propia base de datos Firebase:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Configura Firestore Database
   - Copia tu configuración en `src/app/config/firebase.config.ts`

## Arranque

### Desarrollo Local

```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:8100`

### Build para Producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `www/`

### Deploy en Firebase Hosting

```bash
# Inicializar Firebase (solo la primera vez)
firebase init

# Deploy a producción
firebase deploy
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── categoria-form/              # Formulario modal de categorías
│   │   ├── tarea-form/                  # Formulario modal de tareas
│   │   └── task-counter/               # Componente contador de tareas
│   ├── services/
│   │   ├── categoria.service.ts        # Servicio Firebase para categorías
│   │   └── tarea.service.ts             # Servicio Firebase para tareas
│   ├── pages/
│   │   ├── categorias/                 # Página de gestión de categorías
│   │   └── tareas/                     # Página de gestión de tareas
│   ├── core/
│   │   ├── models/                      # Modelos de datos TypeScript
│   │   │   ├── categoria.model.ts      # Interfaz de categoría
│   │   │   └── tarea.model.ts          # Interfaz de tarea
│   ├── app.component.ts                 # Componente principal con menú
│   ├── app.routes.ts                    # Rutas de la aplicación
│   └── main.ts                         # Punto de entrada con providers Firebase
├── assets/                              # Recursos estáticos
├── environments/                       # Configuración de entornos
└── www/                               # Build de producción
```

## Funcionalidades Principales

### Gestión de Categorías
- **Crear**: Botón flotante (+) para agregar nuevas categorías
- **Leer**: Lista en tiempo real desde Firestore
- **Actualizar**: Click en categoría → Action Sheet → Editar
- **Eliminar**: Click en categoría → Action Sheet → Eliminar

### Gestión de Tareas
- **Crear**: Botón flotante (+) para agregar nuevas tareas
- **Leer**: Lista con infinite scroll y búsqueda en tiempo real
- **Actualizar**: Click en tarea → Action Sheet → Editar
- **Eliminar**: Click en tarea → Action Sheet → Eliminar
- **Buscar**: Campo de búsqueda con filtrado por nombre
- **Contador**: Componente dinámico con estadísticas (pendientes/completadas/total)
- **Toggle**: Cambio rápido de estado (pendiente ↔ completada)

### Características Técnicas
- **Real-time Updates**: Los cambios se reflejan instantáneamente
- **Offline Support**: Firestore maneja desconexiones automáticamente
- **Type Safety**: TypeScript con interfaces definidas
- **Standalone Components**: Arquitectura moderna de Angular
- **Responsive Design**: Optimizado para móviles y escritorio
- **Component-Based**: Componentes reutilizables y modulares
- **Performance**: Infinite scroll para manejo eficiente de grandes volúmenes de datos

## Variables de Entorno

No se requieren variables de entorno para el desarrollo local. Para producción, configura tus credenciales de Firebase en `firebase.config.ts`.



