# Ionic Todo Firebase

Aplicación móvil híbrida para gestión de tareas y categorías con Firebase, desarrollada con Ionic y Angular.

## Características

- ✅ CRUD completo de categorías en tiempo real
- ✅ Base de datos Firestore con actualizaciones automáticas
- ✅ Interfaz moderna con Ionic Framework
- ✅ Diseño responsive y optimizado para móviles
- ✅ Action sheets para gestión de categorías
- ✅ Formularios modales con validación
- ✅ Iconos optimizados para ionicons v7

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
│   │   └── categoria-form/          # Formulario modal de categorías
│   ├── services/
│   │   └── categoria.service.ts     # Servicio Firebase para categorías
│   ├── pages/
│   │   ├── categorias/              # Página de gestión de categorías
│   │   └── tareas/                 # Página de gestión de tareas
│   ├── config/
│   │   └── firebase.config.ts       # Configuración de Firebase
│   └── app.routes.ts                # Rutas de la aplicación
└── ...
```

## Funcionalidades Principales

### Gestión de Categorías
- **Crear**: Botón flotante (+) para agregar nuevas categorías
- **Leer**: Lista en tiempo real desde Firestore
- **Actualizar**: Click en categoría → Action Sheet → Editar
- **Eliminar**: Click en categoría → Action Sheet → Eliminar

### Características Técnicas
- **Real-time Updates**: Los cambios se reflejan instantáneamente
- **Offline Support**: Firestore maneja desconexiones automáticamente
- **Type Safety**: TypeScript con interfaces definidas
- **Standalone Components**: Arquitectura moderna de Angular

## Variables de Entorno

No se requieren variables de entorno para el desarrollo local. Para producción, configura tus credenciales de Firebase en `firebase.config.ts`.



