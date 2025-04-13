body {
  background-color: #1e1e2f;
  color: #fff;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;
}

header {
  background-color: #292954;
  padding: 20px;
}

h1 {
  color: #f1c40f;
  margin-bottom: 10px;
}

select {
  margin-top: 10px;
  padding: 5px;
}

.productos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.producto {
  background-color: #343454;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  width: 220px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.4);
}

.producto img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.carrito {
  background-color: #292954;
  margin: 30px auto;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
}


// Inicializar
filtrarPorCategoria();
cargarCarrito();
