let carrito = [];

const agregarAlCarrito = (id, nombre, precio) => {
  const productoExistente = carrito.find(item => item.productoId === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ productoId: id, nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
};

const actualizarCarrito = () => {
  const carritoLista = document.getElementById('carrito-lista');
  carritoLista.innerHTML = '';
  carrito.forEach(item => {
    const itemLi = document.createElement('li');
    itemLi.classList.add('list-group-item', 'd-flex', 'justify-content-between');
    itemLi.innerHTML = `
      <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
      <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${item.productoId}')">Eliminar</button>
    `;
    carritoLista.appendChild(itemLi);
  });
};

const eliminarDelCarrito = id => {
  carrito = carrito.filter(item => item.productoId !== id);
  actualizarCarrito();
};

const vaciarCarrito = () => {
  carrito = [];
  actualizarCarrito();
  alert('Carrito vaciado correctamente');
};
