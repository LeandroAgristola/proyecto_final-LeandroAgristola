# Colchonera React: Tu Tienda Online para un Descanso Perfecto

![Banner de Colchonera React](https://via.placeholder.com/1200x400?text=Colchonera+React+Banner)
_Nota: Puedes reemplazar la imagen placeholder con un banner atractivo de tu proyecto._

## 🚀 Descripción General del Proyecto

Colchonera React es una aplicación de comercio electrónico (e-commerce) desarrollada en React, diseñada para ofrecer una experiencia de compra fluida y moderna de productos para el descanso, como colchones, almohadas y sábanas. El proyecto está construido siguiendo las mejores prácticas de desarrollo web, con un enfoque en la responsividad, la interactividad del usuario, la gestión de datos mediante una API REST simulada (MockAPI), y una administración de productos completa.

## ✨ Características Principales

Este proyecto cumple con los siguientes requerimientos y funcionalidades:

### 🛒 Gestión del Carrito y Autenticación de Usuarios
* **Carrito de Compras Funcional:** Implementado con la Context API de React (`CartContext`), permitiendo a los usuarios agregar, disminuir la cantidad, eliminar productos y vaciar el carrito por completo. El estado del carrito se mantiene de forma global en la aplicación.
* **Autenticación de Usuarios:** Gestión del estado de autenticación a través de `AuthContext`. Incluye un sistema de `login` simulado que utiliza `localStorage` para persistir la sesión.
* **Rutas Protegidas:** Acceso restringido a secciones sensibles como el carrito de compras (`/cart`) y el panel de administración (`/admin`), asegurando que solo los usuarios autenticados puedan acceder.

### 📝 CRUD de Productos con MockAPI
* **Administración Completa del Catálogo:** Permite realizar operaciones de Creación (Create), Lectura (Read), Actualización (Update) y Eliminación (Delete) de productos.
* **Formulario de Productos:** Interfaz para agregar y editar productos con campos controlados por `useState`. Incluye validación de datos (nombre obligatorio, precio mayor a 0, descripción mínima de 10 caracteres).
* **Comunicación con API:** Todas las operaciones CRUD se realizan mediante solicitudes HTTP (POST, PUT, DELETE) a una API REST simulada (MockAPI).
* **Mensajes de Usuario:** Se utilizan notificaciones claras (éxito, error, carga) mediante `React Toastify` para informar al usuario sobre el resultado de sus acciones.
* **Manejo de Errores y Carga:** La aplicación gestiona y muestra estados de carga y mensajes de error si hay problemas al interactuar con la API. Se incluye un modal de confirmación antes de eliminar productos.

### 🎨 Optimización de Diseño y Responsividad
* **Diseño Responsivo:** Implementación avanzada del sistema de grillas de Bootstrap 5 para garantizar una adaptación fluida del contenido a diferentes tamaños de pantalla (móviles, tabletas, escritorios).
    * **Navbar Adaptativo:** Cabecera completamente reorganizada para móviles, con logo, barra de búsqueda y carrito alineados de forma intuitiva. El menú de hamburguesa se expande como un overlay de pantalla completa y cierra automáticamente al navegar.
    * **Menús Desplegables Controlados por React:** Los submenús de usuario y categorías son controlados directamente por el estado de React para evitar conflictos con Bootstrap, permitiendo un despliegue y cierre consistente al hacer clic fuera o al navegar.
    * **Tarjetas de Productos:** Optimización de la cantidad de ítems por fila en `ItemListContainer` para tabletas (3 por fila) y móviles (2 por fila), manteniendo 4 por fila en escritorio. Las tarjetas están estilizadas con `Styled-components` para adaptarse sin estirarse.
    * **Imágenes Responsivas:** Se cargan imágenes específicas para móvil o escritorio en el carrusel y los banners de categorías/ofertas/más vendidos, mejorando los tiempos de carga y la calidad visual.
* **Estilización Modular:** Uso extensivo de `styled-components` para personalizar la apariencia de los componentes de forma modular y mantener el CSS organizado.
* **Interactividad Mejorada:** Integración de `React Icons` para iconos en botones y elementos interactivos, y `React Toastify` para notificaciones claras al usuario.
* **SEO y Accesibilidad:**
    * **React Helmet Async:** Implementado para gestionar dinámicamente el `<title>` y las etiquetas `<meta>` en el `<head>` de cada página, optimizando la visibilidad en motores de búsqueda.
    * **Etiquetas ARIA:** Se han añadido atributos ARIA (`aria-label`, `aria-expanded`, `aria-controls`, `role`, etc.) a elementos interactivos clave para mejorar la accesibilidad para usuarios de lectores de pantalla y otras tecnologías asistivas.

### 🔍 Funcionalidades de Búsqueda y Paginación
* **Barra de Búsqueda:** Permite a los usuarios filtrar productos por nombre o descripción de forma rápida y eficiente, actualizando los resultados en tiempo real.
* **Paginador de Productos:** Divide la lista de productos en varias páginas, mejorando la navegación y la experiencia de usuario al manejar grandes catálogos.

### 📦 Preparación para el Despliegue
* **Compatibilidad Verificada:** El diseño ha sido probado y optimizado para su visualización y funcionamiento en dispositivos móviles, tabletas y escritorios.
* **Optimización del Código:** Se ha realizado una revisión general para asegurar la gestión eficiente del estado global.

## 🛠️ Tecnologías Utilizadas

* **Frontend:**
    * [React](https://react.dev/) (v19.x) - Biblioteca principal para la interfaz de usuario.
    * [Vite](https://vitejs.dev/) - Herramienta de construcción rápida para proyectos web modernos.
    * [React Router DOM](https://reactrouter.com/en/main) (v6.x) - Para la gestión de rutas y navegación.
    * [Styled Components](https://styled-components.com/) - Para escribir CSS en JavaScript, facilitando la estilización de componentes.
    * [Bootstrap 5](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.netlify.app/) - Framework CSS para diseño responsivo y componentes UI.
    * [React Icons](https://react-icons.github.io/react-icons/) - Colección de iconos populares.
    * [React Toastify](https://fkhadra.github.io/react-toastify/) - Para notificaciones de usuario personalizables.
    * [Axios](https://axios-http.com/) - Cliente HTTP para realizar solicitudes a la API.
    * [React Helmet Async](https://www.npmjs.com/package/react-helmet-async) - Para gestionar dinámicamente las etiquetas `head` del documento (SEO).
* **Backend (Simulado):**
    * [MockAPI](https://mockapi.io/) - Servicio para simular una API REST.

## 🚀 Instalación y Uso

Sigue estos pasos para levantar el proyecto en tu entorno local:

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/en/) (versión 18 o superior recomendada) y `npm` (que se instala con Node.js).

### 1. Clonar el Repositorio

Abre tu terminal o Git Bash y ejecuta:

```bash
git clone [https://github.com/tu-usuario/proyecto-final-leandroagristola.git](https://github.com/tu-usuario/proyecto-final-leandroagristola.git)
cd proyecto-final-leandroagristola