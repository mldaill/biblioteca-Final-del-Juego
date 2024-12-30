import React, { useState } from "react";
import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Gestión de Reservas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ReservationForm setReservations={setReservations} />
        <ReservationList
          reservations={reservations}
          setReservations={setReservations}
        />
      </div>
    </div>
  );
};

export default Reservations;

