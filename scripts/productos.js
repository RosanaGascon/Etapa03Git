const cargarProductos = () => {
    fetch('http://localhost:3000/api/productos')
      .then(response => response.json())
      .then(data => {
        const productosLista = document.getElementById('productos-lista');
        productosLista.innerHTML = '';
        data.forEach(producto => {
          const productoDiv = document.createElement('div');
          productoDiv.classList.add('col-md-4', 'mb-4');
          productoDiv.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                <p class="card-text"><strong>Stock:</strong> ${producto.stock}</p>
                <button onclick="agregarAlCarrito('${producto._id}', '${producto.nombre}', ${producto.precio})" class="btn btn-success">Agregar al carrito</button>
                <button onclick="eliminarProducto('${producto._id}')" class="btn btn-danger">Eliminar producto</button>
              </div>
            </div>
          `;
          productosLista.appendChild(productoDiv);
        });
      });
  };
  
  const eliminarProducto = id => {
    fetch(`http://localhost:3000/api/productos/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          alert('Producto eliminado');
          cargarProductos();
        }
      })
      .catch(error => console.error('Error al eliminar producto:', error));
  };
  
  document.getElementById('formAgregarProducto').addEventListener('submit', e => {
    e.preventDefault();
  
    const producto = {
      nombre: document.getElementById('nombre').value,
      descripcion: document.getElementById('descripcion').value,
      precio: parseFloat(document.getElementById('precio').value),
      stock: parseInt(document.getElementById('stock').value),
    };
  
    fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    })
      .then(response => response.json())
      .then(data => {
        alert('Producto agregado');
        cargarProductos();
      })
      .catch(error => console.error('Error al agregar producto:', error));
  });
  
  cargarProductos();
  