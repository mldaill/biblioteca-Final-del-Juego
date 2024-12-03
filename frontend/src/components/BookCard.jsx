// src/components/BookCard.jsx
import React from "react";

function BookCard({ title, author, description, image }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm">
      {image && (
        <img
          src={image}
          alt={`Portada de ${title}`}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <h3 className="text-gray-600 italic mb-2">{author}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
}

