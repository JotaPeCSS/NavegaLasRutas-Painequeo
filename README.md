# Tienda Online React - Proyecto Final

Este proyecto es una aplicación web interactiva de una tienda online creada con **React.js**. La aplicación permite a los usuarios explorar una lista de productos, visualizar detalles específicos, y gestionar un carrito de compras con funcionalidades dinámicas, como control de stock y persistencia de datos. El proyecto ha sido desarrollado siguiendo las mejores prácticas de desarrollo frontend y cumpliendo con una rúbrica específica de evaluación.

## 🚀 Funcionalidades

1. **Listado de Productos**:
   - Visualización de productos con detalles básicos (nombre, precio, stock).
   - Botón para añadir productos al carrito, respetando el límite de stock.

2. **Detalle de Producto**:
   - Vista detallada de cada producto al hacer clic en "Ver detalle".
   - Botón "Volver" para regresar al listado de productos.

3. **Carrito de Compras**:
   - Añadir o quitar productos desde el carrito con los botones `+` y `-`.
   - Botón para vaciar el carrito y otro para finalizar la compra.
   - Control dinámico del stock: las unidades añadidas o eliminadas afectan directamente al stock disponible.
   - Persistencia del carrito en `localStorage`.

4. **Alertas Dinámicas**:
   - Notificaciones visuales para confirmar acciones como añadir productos, vaciar el carrito, o finalizar la compra.

5. **Rutas Navegables**:
   - Implementación de `react-router-dom` para gestionar:
     - `/`: Listado de productos.
     - `/producto/:id`: Detalle de un producto específico.

6. **Promesas Simuladas**:
   - Simulación de una API para cargar los productos de forma asíncrona.

## 🛠️ Tecnologías Utilizadas

- **React.js**: Framework principal para la creación de la aplicación.
- **React Router**: Gestión de rutas dinámicas.
- **React-Bootstrap**: Estilización de componentes y alertas dinámicas.
- **HTML5 y CSS3**: Maquetación y estilos personalizados.
- **JavaScript (ES6+)**: Lógica y funcionalidad del frontend.
