import React from "react";

const UserTable = ({ users, onDelete, onEdit }) => {
  return (
    <table className="table-auto w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-t">
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => {
                  console.log("Edit user:", user); // Verifica qué usuario se está editando
                  onEdit(user);
                }}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  console.log("Delete user ID:", user.id); // Verifica el ID del usuario a eliminar
                  onDelete(user.id);
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
