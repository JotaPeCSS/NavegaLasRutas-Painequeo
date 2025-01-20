# NavegaLasRutas-Painequeo

NavegaLasRutas-Painequeo es una aplicación web interactiva desarrollada con React que simula una tienda en línea. Este proyecto fue diseñado para implementar conceptos fundamentales y avanzados de React, como manejo de estados, enrutamiento dinámico, gestión de contextos, persistencia de datos y componentes reutilizables. Además, utiliza estilos personalizados con Bootstrap y CSS nativo para ofrecer una interfaz amigable.

## Funcionalidades principales

- **Carrito de compras**:
  - Añade productos al carrito desde el catálogo principal.
  - Controla la cantidad de productos en el carrito según su stock disponible.
  - Persiste el estado del carrito en `localStorage`, permitiendo que el usuario conserve su selección tras recargar la página.
  - Incluye botones para vaciar el carrito con confirmación y para finalizar la compra.

- **Mensajes interactivos**:
  - Alertas estilizadas (usando Bootstrap) para notificar al usuario sobre acciones importantes, como añadir productos, vaciar el carrito o finalizar la compra.

- **Gestión de productos**:
  - Catálogo dinámico con stock controlado.
  - Productos deshabilitados automáticamente cuando el stock llega a 0.

- **Enrutamiento**:
  - Navegación entre diferentes vistas, como el catálogo general, productos por categoría, y detalles individuales de cada producto.
  - Manejo de rutas no existentes con una página de error personalizada.

## Tecnologías utilizadas

- **React**: Para la construcción de componentes reutilizables y manejo de estados.
- **React Router DOM**: Para implementar enrutamiento dinámico.
- **Bootstrap**: Para estilos predefinidos y alertas interactivas.
- **CSS nativo**: Para personalizar el diseño y agregar detalles únicos a la interfaz.
- **LocalStorage**: Para mantener la persistencia del carrito.
