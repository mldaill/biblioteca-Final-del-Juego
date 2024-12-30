import React from 'react';


const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-semibold text-gray-800">Contacto - Biblioteca Final del Juego</h1>
                </header>

                {/* Información de contacto */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700">Información de contacto</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        <strong>Dirección:</strong> Entre Rios 729 - Piso 9, Rosario - Santa Fe - Argentina
                    </p>
                    <p className="mt-2 text-lg text-gray-600">
                        <strong>Teléfono:</strong> 0341 456 7890
                    </p>
                    <p className="mt-2 text-lg text-gray-600">
                        <strong>Email:</strong> contacto@finaldeljuego.com
                    </p>
                </section>

                {/* Formulario de contacto */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700">Envíanos un mensaje</h2>
                    <form action="/submit_form" method="POST" className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
                            <input type="text" id="name" name="name" required className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Correo electrónico</label>
                            <input type="email" id="email" name="email" required className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Asunto</label>
                            <input type="text" id="subject" name="subject" required className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Mensaje</label>
                            <textarea id="message" name="message" rows="4" required className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                        </div>

                        <div>
                            <label htmlFor="file" className="block text-lg font-medium text-gray-700">Adjuntar archivo (opcional)</label>
                            <input type="file" id="file" name="file" className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>

                        <button type="submit" className="mt-6 w-auto py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">Enviar</button>
                    </form>
                </section>

                {/* Redes sociales */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700">Síguenos en nuestras redes sociales</h2>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a href="https://facebook.com/biblioteca" target="_blank" className="text-green-600 hover:text-green-800">
                            <i className="ri-facebook-box-fill text-4xl"></i>
                        </a>
                        <a href="https://instagram.com/biblioteca" target="_blank" className="text-green-600 hover:text-green-800">
                            <i className="ri-instagram-line text-4xl"></i>
                        </a>
                        <a href="https://twitter.com/biblioteca" target="_blank" className="text-green-600 hover:text-green-800">
                            <i className="ri-twitter-x-line text-4xl"></i>
                        </a>
                    </div>
                </section>

                {/* Mapa de ubicación */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700">Ubicación</h2>
                    <div className="mt-4">
                        <p>Consulta nuestra ubicación en el siguiente mapa:</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1330.2094646180926!2d-60.64126403439861!3d-32.938268183519595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e38925c63e0d%3A0x6eafbe87cb67d263!2sEntre%20R%C3%ADos%20729%2C%20Rosario%2C%20Santa%20Fe%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1702572333882!5m2!1ses-419!2sus"
                            width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                            title="Ubicación de la Biblioteca"
                        ></iframe>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center mt-12">
                    <p className="text-gray-600">&copy; 2024 Final del Juego. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
}

export default Contact;
