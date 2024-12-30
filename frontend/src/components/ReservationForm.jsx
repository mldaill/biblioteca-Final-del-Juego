import React, { useState } from "react";

const ReservationForm = ({ setReservations }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    isbn: "",
    pickup_date: "",
    return_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la reserva");
      }

      const newReservation = await response.json();
      setReservations((prev) => [...prev, newReservation]);
      setFormData({ user_id: "", isbn: "", pickup_date: "", return_date: "" });
      alert("Reserva creada exitosamente");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded p-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Crear Reserva</h2>
      <div className="mb-3">
        <label className="block font-medium">Usuario ID</label>
        <input
          type="number"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">Fecha de Retiro</label>
        <input
          type="date"
          name="pickup_date"
          value={formData.pickup_date}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">Fecha de Devolución</label>
        <input
          type="date"
          name="return_date"
          value={formData.return_date}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
      >
        Crear Reserva
      </button>
    </form>
  );
};

export default ReservationForm;
