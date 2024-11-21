import React, { useState } from 'react';
import './Contact.scss';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                mode: 'no-cors', // Solución temporal
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer re_dqnMFj2T_EdTPGLiy3QesHYxTkADjpbFW`, // Clave API
                },
                body: JSON.stringify({
                    from: 'toromurieljhon@gmail.com',
                    to: 'toromurieljhon@gmail.com',
                    subject: `Nuevo mensaje de ${formData.name}`,
                    html: `
                        <h1>Nuevo mensaje de contacto</h1>
                        <p><strong>Nombre:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${formData.message}</p>
                    `,
                }),
            });

            // En modo no-cors, no puedes leer la respuesta. Asume éxito si no hay errores.
            if (!response.ok && response.type !== 'opaque') {
                throw new Error('No se pudo enviar el mensaje');
            }

            setSuccessMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            setErrorMessage('Hubo un error al enviar tu mensaje. Por favor, inténtalo nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            <h1>Contáctanos</h1>
            <p>¡Nos encantaría saber de ti! Llena el siguiente formulario para enviarnos un mensaje.</p>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Contact;
