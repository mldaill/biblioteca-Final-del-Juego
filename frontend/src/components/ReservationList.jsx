import React, { useEffect } from "react";

const ReservationList = ({ reservations, setReservations }) => {
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reservations`);
        if (!response.ok) {
          throw new Error("Error al cargar las reservas");
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    fetchReservations();
  }, [setReservations]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/reservations/${id}`, {
        method: "DELETE", 
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar la reserva");
      }
  
      setReservations((prev) => prev.filter((res) => res.id !== id));
      alert("Reserva eliminada exitosamente");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  
  return (
    <div className="bg-white shadow-md rounded p-5">
      <h2 className="text-xl font-bold mb-4">Lista de Reservas</h2>
      <ul>
        {reservations.length === 0 ? (
          <li className="text-gray-500">No hay reservas registradas.</li>
        ) : (
          reservations.map((res) => (
            <li
              key={res.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p>
                  <strong>ID:</strong> {res.id}
                </p>
                <p>
                  <strong>Usuario ID:</strong> {res.user_id}
                </p>
                <p>
                  <strong>ISBN:</strong> {res.isbn}
                </p>
                <p>
                  <strong>Fechas:</strong> {res.pickup_date} - {res.return_date}
                </p>
              </div>
              <button
                onClick={() => handleDelete(res.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ReservationList;
