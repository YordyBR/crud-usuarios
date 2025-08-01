let users = JSON.parse(localStorage.getItem("users")) || [];

function renderUsers() {
  const list = document.getElementById("user-list");
  list.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="editUser(${index})">Editar</button>
        <button onclick="deleteUser(${index})">Eliminar</button>
      </td>
    `;
    list.appendChild(row);
  });
}
// Validacion del usuario
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

document.getElementById("user-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if (name && email) {
    users.push({ name, email });
    saveUsers();
    renderUsers();
    e.target.reset();
  }
});

function deleteUser(index) {
  users.splice(index, 1);
  saveUsers();
  renderUsers();
}

function editUser(index) {
  const user = users[index];
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  deleteUser(index);
}

renderUsers();
