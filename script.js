const productos = [
  {
    id: 1,
    nombre: "Diadema Gamer RGB Xtreme",
    precio: 65.0,
    imagen: "https://images.unsplash.com/photo-1619287193043-e01fa4aee5a3?auto=format&fit=crop&w=400&q=80",
    categoria: "Gamer"
  },
  {
    id: 2,
    nombre: "Diadema ProSound 7.1",
    precio: 85.0,
    imagen: "https://images.unsplash.com/photo-1585386959984-a4155224a1c7?auto=format&fit=crop&w=400&q=80",
    categoria: "Pro"
  },
  {
    id: 3,
    nombre: "Diadema HyperBass X200",
    precio: 70.0,
    imagen: "https://images.unsplash.com/photo-1585386951122-e4b4b18db368?auto=format&fit=crop&w=400&q=80",
    categoria: "Gamer"
  },
  {
    id: 4,
    nombre: "Diadema StormCore LED",
    precio: 55.0,
    imagen: "https://images.unsplash.com/photo-1585386964510-4ff7c26a2c2a?auto=format&fit=crop&w=400&q=80",
    categoria: "LED"
  },
  {
    id: 5,
    nombre: "Diadema Kraken Pro V2",
    precio: 90.0,
    imagen: "https://images.unsplash.com/photo-1626114397771-3d9c1e54e8fd?auto=format&fit=crop&w=400&q=80",
    categoria: "Pro"
  }
];

let carrito = new Map();

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const contenedorPayPal = document.getElementById("paypal-button-container");

function filtrarPorCategoria() {
  const seleccion = document.getElementById("categoria").value;
  const productosFiltrados = seleccion === "todos"
    ? productos
    : productos.filter(p => p.categoria === seleccion);

  mostrarProductos(productosFiltrados);
}

function mostrarProductos(lista = productos) {
  contenedorProductos.innerHTML = "";
  lista.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" style="height:150px; object-fit:cover;">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  if (carrito.has(id)) {
    carrito.get(id).cantidad++;
  } else {
    carrito.set(id, { ...producto, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarrito();
}

function eliminarDelCarrito(id) {
  if (!carrito.has(id)) return;
  const item = carrito.get(id);
  if (item.cantidad > 1) {
    item.cantidad--;
  } else {
    carrito.delete(id);
  }

  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  let cantidad = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad}
      <button onclick="eliminarDelCarrito(${item.id})">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
    cantidad += item.cantidad;
  });

  totalCarrito.textContent = total.toFixed(2);
  cantidadCarrito.textContent = cantidad;
  contenedorPayPal.style.display = carrito.size > 0 ? "block" : "none";
}

function vaciarCarrito() {
  if (confirm("¿Seguro que quieres vaciar el carrito?")) {
    carrito.clear();
    guardarCarrito();
    actualizarCarrito();
  }
}

function finalizarCompra() {
  if (carrito.size === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra! 🎧");
  vaciarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(Array.from(carrito.entries())));
}

function cargarCarrito() {
  const data = localStorage.getItem("carrito");
  if (data) {
    carrito = new Map(JSON.parse(data));
    actualizarCarrito();
  }
}

// PayPal integration
if (window.paypal) {
  paypal.Buttons({
    createOrder: function (data, actions) {
      const total = Array.from(carrito.values()).reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2)
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert(`¡Gracias ${details.payer.name.given_name}, tu pago fue exitoso! 🎧`);
        vaciarCarrito();
      });
    },
    onError: function (err) {
      console.error(err);
      alert("Ocurrió un error con el pago.");
    }
  }).render("#paypal-button-container");
}

// Inicializar
filtrarPorCategoria();
cargarCarrito();
