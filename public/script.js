const API_URL = "/api/rooms";

// Función para listar las habitaciones
async function fetchRooms() {
  const response = await fetch(API_URL);
  const rooms = await response.json();
  const roomList = document.getElementById("room-list");

  roomList.innerHTML = rooms
    .map(
      (room) => `
      <div class="room">
        <p><strong>Número:</strong> ${room.number}</p>
        <p><strong>Tipo:</strong> ${room.type}</p>
        <p><strong>Precio:</strong> $${room.price}</p>
        <p><strong>Estado:</strong> ${room.status}</p>
        <button onclick="reserveRoom('${room._id}')">Reservar</button>
        <button onclick="payRoom('${room._id}')">Pagar</button>
      </div>
    `
    )
    .join("");
}

// Función para añadir una habitación
async function addRoom(event) {
  event.preventDefault();

  const number = document.getElementById("number").value;
  const type = document.getElementById("type").value;
  const price = document.getElementById("price").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number, type, price }),
  });

  if (response.ok) {
    alert("Habitación añadida con éxito");
    fetchRooms(); // Actualizar la lista
  } else {
    alert("Error al añadir la habitación");
  }

  // Limpiar el formulario
  document.getElementById("add-room-form").reset();
}

// Función para reservar una habitación
async function reserveRoom(id) {
  const response = await fetch(`${API_URL}/${id}/reserve`, { method: "POST" });
  if (response.ok) {
    alert("Habitación reservada con éxito");
    fetchRooms(); // Actualizar la lista
  } else {
    alert("Error al reservar la habitación");
  }
}

// Función para pagar una habitación
async function payRoom(id) {
  const response = await fetch(`${API_URL}/${id}/pay`, { method: "POST" });
  if (response.ok) {
    alert("Habitación pagada con éxito");
    fetchRooms(); // Actualizar la lista
  } else {
    alert("Error al pagar la habitación");
  }
}

// Configurar el formulario para añadir habitaciones
document.getElementById("add-room-form").addEventListener("submit", addRoom);

// Cargar la lista inicial de habitaciones
fetchRooms();

// Función para mostrar el formulario de actualización con los datos actuales
function showUpdateForm(room) {
    document.getElementById("update-id").value = room._id;
    document.getElementById("update-number").value = room.number;
    document.getElementById("update-type").value = room.type;
    document.getElementById("update-price").value = room.price;
    document.getElementById("update-status").value = room.status;
  
    document.getElementById("update-room").style.display = "block";
    document.getElementById("add-room").style.display = "none";
  }
  
  // Función para cancelar la actualización
  function cancelUpdate() {
    document.getElementById("update-room-form").reset();
    document.getElementById("update-room").style.display = "none";
    document.getElementById("add-room").style.display = "block";
  }
  
  // Función para actualizar una habitación
  async function updateRoom(event) {
    event.preventDefault();
  
    const id = document.getElementById("update-id").value;
    const number = document.getElementById("update-number").value;
    const type = document.getElementById("update-type").value;
    const price = document.getElementById("update-price").value;
    const status = document.getElementById("update-status").value;
  
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number, type, price, status }),
    });
  
    if (response.ok) {
      alert("Habitación actualizada con éxito");
      fetchRooms(); // Actualizar la lista
      cancelUpdate();
    } else {
      alert("Error al actualizar la habitación");
    }
  }
  
  // Función para eliminar una habitación
  async function deleteRoom(id) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta habitación?");
    if (!confirmDelete) return;
  
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  
    if (response.ok) {
      alert("Habitación eliminada con éxito");
      fetchRooms(); // Actualizar la lista
    } else {
      alert("Error al eliminar la habitación");
    }
  }
  
  // Modificar fetchRooms para incluir los botones de actualizar y eliminar
  async function fetchRooms() {
    const response = await fetch(API_URL);
    const rooms = await response.json();
    const roomList = document.getElementById("room-list");
  
    roomList.innerHTML = rooms
      .map(
        (room) => `
        <div class="room">
          <p><strong>Número:</strong> ${room.number}</p>
          <p><strong>Tipo:</strong> ${room.type}</p>
          <p><strong>Precio:</strong> $${room.price}</p>
          <p><strong>Estado:</strong> ${room.status}</p>
          <button onclick="reserveRoom('${room._id}')">Reservar</button>
          <button onclick="payRoom('${room._id}')">Pagar</button>
          <button onclick="showUpdateForm(${JSON.stringify(room)})">Actualizar</button>
          <button onclick="deleteRoom('${room._id}')">Eliminar</button>
        </div>
      `
      )
      .join("");
  }
  
  // Configurar el formulario para actualizar habitaciones
  document.getElementById("update-room-form").addEventListener("submit", updateRoom);

//
function renderRooms(rooms) {
    const roomList = document.getElementById("room-list");
    roomList.innerHTML = ""; // Limpiar contenido previo
  
    rooms.forEach((room) => {
      const roomCard = document.createElement("div");
      roomCard.className = "room-card";
  
      roomCard.innerHTML = `
        <h3>Habitación ${room.number}</h3>
        <p>Tipo: ${room.type}</p>
        <p>Precio: $${room.price}</p>
        <p>Estado: ${room.status}</p>
        <button class="reserve" onclick="reserveRoom('${room._id}')">Reservar</button>
        <button class="pay" onclick="payRoom('${room._id}')">Pagar</button>
        <button class="delete" onclick="deleteRoom('${room._id}')">Eliminar</button>
      `;
  
      roomList.appendChild(roomCard);
    });
  }
  
  // Funciones para acciones
  async function reserveRoom(id) {
    await fetch(`/api/rooms/${id}/reserve`, { method: "POST" });
    fetchRooms(); // Actualizar la lista
  }
  
  async function payRoom(id) {
    await fetch(`/api/rooms/${id}/pay`, { method: "POST" });
    fetchRooms(); // Actualizar la lista
  }
  
  async function deleteRoom(id) {
    await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    fetchRooms(); // Actualizar la lista
  }
  
  // Obtener las habitaciones al cargar la página
  async function fetchRooms() {
    const response = await fetch("/api/rooms");
    const rooms = await response.json();
    renderRooms(rooms);
  }
  
  fetchRooms();
  