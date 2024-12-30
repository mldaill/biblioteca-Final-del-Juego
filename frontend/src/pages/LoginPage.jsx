import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formType, setFormType] = useState("register");
  const handleFormSwitch = (type) => {
    setFormType(type);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${formType === "register" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => handleFormSwitch("register")}
          >
            Regístrate
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${formType === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => handleFormSwitch("login")}
          >
            Ingresa
          </button>
        </div>
        {formType === "register" ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);
      setMessage("Usuario registrado exitosamente");
      setError(null); // Limpiar errores previos
      setFormData({ name: "", email: "", password: "", isAdmin: false });
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      setError("Hubo un error al registrar el usuario");
      setMessage(null); // Limpiar mensaje de éxito
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ingresa tu nombre"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ingresa tu email"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="isAdmin"
          checked={formData.isAdmin}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">Soy administrador</label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Registrar
      </button>
      {message && <div className="mt-4 text-green-500">{message}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </form>
  );
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);
      setMessage("Inicio de sesión exitoso");
      navigate('/Libros');
      setError(null); // Limpiar errores previos

    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      setError("Hubo un error al iniciar sesión");
      setMessage(null); // Limpiar mensaje de éxito
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ingresa tu email"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Ingresar
      </button>
      {message && <div className="mt-4 text-green-500">{message}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </form>
  );
};

export default LoginPage;
