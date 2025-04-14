// Array de productos
const productos = [
  {
    id: 1,
    nombre: "Diadema Gamer RGB Logitech G Pro X",
    precio: 120.0,
    categoria: "gaming",
    img: "https://m.media-amazon.com/images/I/91m2i6c9v1L._AC_SL1500_.jpg"
  },
  {
    id: 2,
    nombre: "Diadema Gamer Corsair HS50 Pro",
    precio: 60.0,
    categoria: "gaming",
    img: "https://m.media-amazon.com/images/I/91HYkxBOJ4L._AC_SL1500_.jpg"
  },
  {
    id: 3,
    nombre: "Diadema Gaming Razer Kraken V3",
    precio: 140.0,
    categoria: "gaming",
    img: "https://m.media-amazon.com/images/I/61WjFNsH4jL._AC_SL1500_.jpg"
  },
  {
    id: 4,
    nombre: "Diadema Normal Sony MDR-ZX110",
    precio: 30.0,
    categoria: "normal",
    img: "https://m.media-amazon.com/images/I/71yD6l6y1hL._AC_SL1500_.jpg"
  },
  {
    id: 5,
    nombre: "Diadema Gaming SteelSeries Arctis 7",
    precio: 180.0,
    categoria: "gaming",
    img: "https://m.media-amazon.com/images/I/61tRPV6J5-L._AC_SL1500_.jpg"
  },
  {
    id: 6,
    nombre: "Diadema Normal Sennheiser HD 206",
    precio: 50.0,
    categoria: "normal",
    img: "https://m.media-amazon.com/images/I/91dPz7Zyq9L._AC_SL1500_.jpg"
  }
];

// Variables globales
let carrito = [];
const contenedorProductos = document.getElementById('productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');
const cantidadElement = document.getElementById('cantidad-carrito');
const selectCategoria = document.getElementById('categoria');
const btnVaciar = document.getElementById('vaciar-carrito');

// Función para mostrar productos
function mostrarProductos() {
  contenedorProductos.innerHTML = '';
  
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toFixed(2)}</p>
      <button class="agregar" data-id="${producto.id}">Agregar</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// Función para filtrar productos
function filtrarProductos() {
  const categoria = selectCategoria.value;
  
  if (categoria === 'todos') {
    mostrarProductos();
  } else {
    const productosFiltrados = productos.filter(
      producto => producto.categoria === categoria
    );
    
    contenedorProductos.innerHTML = '';
    
    productosFiltrados.forEach(producto => {
      const div = document.createElement('div');
      div.className = 'producto';
      div.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio.toFixed(2)}</p>
        <button class="agregar" data-id="${producto.id}">Agregar</button>
      `;
      contenedorProductos.appendChild(div);
    });
  }
}

// Función para agregar al carrito (CORRECCIÓN APLICADA)
function agregarAlCarrito(e) {
  if (e.target.classList.contains('agregar')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const producto = productos.find(p => p.id === id);
    
    const existe = carrito.some(item => item.id === id);
    
    if (existe) {
      carrito = carrito.map(item => {
        if (item.id === id) {
          return {
            ...item,
            cantidad: item.cantidad + 1
          };
        }
        return item;
      });
    } else {
      carrito.push({
        ...producto,
        cantidad: 1
      });
    }
    
    actualizarCarrito();
    guardarCarrito();
  }
}

// Función para actualizar el carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  
  let total = 0;
  let cantidad = 0;
  
  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${producto.nombre} 
      <span>$${producto.precio} x ${producto.cantidad}</span>
      <button class="eliminar" data-id="${producto.id}">X</button>
    `;
    listaCarrito.appendChild(li);
    
    total += producto.precio * producto.cantidad;
    cantidad += producto.cantidad;
  });
  
  totalElement.textContent = total.toFixed(2);
  cantidadElement.textContent = cantidad;
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(e) {
  if (e.target.classList.contains('eliminar')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
    guardarCarrito();
  }
}

// Función para vaciar el carrito
function vaciarCarrito() {
  if (carrito.length === 0) return;
  
  if (confirm('¿Estás seguro de vaciar el carrito?')) {
    carrito = [];
    actualizarCarrito();
    guardarCarrito();
  }
}

// Función para guardar en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar del localStorage
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  cargarCarrito();
  
  selectCategoria.addEventListener('change', filtrarProductos);
  contenedorProductos.addEventListener('click', agregarAlCarrito);
  listaCarrito.addEventListener('click', eliminarDelCarrito);
  btnVaciar.addEventListener('click', vaciarCarrito);
});
