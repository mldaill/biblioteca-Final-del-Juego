import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Asigna el usuario seleccionado al estado
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Verificar que editingUser tiene un id válido antes de hacer la solicitud PUT
    if (!editingUser || !editingUser.id) {
      console.error("ID de usuario no válido");
      return;
    }

    console.log("Formulario enviado con usuario:", editingUser); // Depuración

    try {
      const response = await fetch(`http://localhost:3000/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        fetchUsers(); // Refresca la lista de usuarios
        setEditingUser(null); // Cierra el formulario de edición
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    filter ? user.id === parseInt(filter) : true
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Gestión de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por ID"
        className="p-2 border border-gray-300 rounded mb-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <UserTable users={filteredUsers} onDelete={handleDelete} onEdit={handleEdit} />

      {/* Formulario de edición */}
      {editingUser && (
        <div className="edit-form bg-white p-4 rounded shadow mt-4">
          <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
          <form onSubmit={handleUpdate}>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                className="p-2 border border-gray-300 rounded w-full"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                className="p-2 border border-gray-300 rounded w-full"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Password:
              <input
                type="text"
                className="p-2 border border-gray-300 rounded w-full"
                value={editingUser.password}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, password: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Es administrador:
              <input
                type="checkbox" 
                className="p-2 border border-gray-300 rounded"
                checked={editingUser.is_admin} 
                onChange={(e) =>
                  setEditingUser({ ...editingUser, is_admin: e.target.checked })
                }
              />
            </label>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                onClick={() => setEditingUser(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
