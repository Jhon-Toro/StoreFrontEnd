import React from 'react';
import { UserGroupIcon, CubeIcon, PhoneIcon, StarIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import './AboutUS.scss';

const AboutUs: React.FC = () => {
    return (
        <section className="aboutUs">
            <div className="container">
                {/* Introducción */}
                <h2 className="title">Sobre Nosotros</h2>
                <p className="description">
                    En <span className="brandName">Nuestra Tienda</span>, nos apasiona ofrecer productos de alta calidad que transformen vidas. Nos enorgullecemos de brindar experiencias memorables a
                    nuestros clientes, respaldados por un equipo comprometido y una visión global.
                </p>

                {/* Características clave */}
                <div className="features">
                    <div className="feature">
                        <UserGroupIcon className="icon" />
                        <h3>Equipo Experto</h3>
                        <p>Un equipo dedicado a garantizar tu satisfacción con cada compra.</p>
                    </div>
                    <div className="feature">
                        <CubeIcon className="icon" />
                        <h3>Productos Premium</h3>
                        <p>Seleccionamos cada artículo pensando en la calidad y funcionalidad.</p>
                    </div>
                    <div className="feature">
                        <PhoneIcon className="icon" />
                        <h3>Soporte 24/7</h3>
                        <p>Estamos disponibles día y noche para asistirte en lo que necesites.</p>
                    </div>
                </div>

                {/* Línea de tiempo de logros */}
                <div className="timeline">
                    <h3 className="timelineTitle">Nuestros Logros</h3>
                    <ul className="events">
                        <li className="event">
                            <StarIcon className="timelineIcon" />
                            <div>
                                <h4>Fundación</h4>
                                <p>Comenzamos con una pequeña tienda en 2015, con el objetivo de mejorar la experiencia de compra online.</p>
                            </div>
                        </li>
                        <li className="event">
                            <GlobeAltIcon className="timelineIcon" />
                            <div>
                                <h4>Expansión Global</h4>
                                <p>En 2018, alcanzamos a clientes de más de 20 países, llevando nuestra calidad al mundo.</p>
                            </div>
                        </li>
                        <li className="event">
                            <CubeIcon className="timelineIcon" />
                            <div>
                                <h4>10,000+ Clientes Felices</h4>
                                <p>En 2022, celebramos nuestro décimo aniversario con miles de clientes satisfechos.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Galería */}
                <div className="images">
                    <div className="imageCard animate">
                        <img src="https://www.aerocivil.gov.co/atencion/participacion/PublishingImages/nuestro-equipo-de-trabajo/equipo-trabajo%20copia.png" alt="Nuestro Equipo" className="image" />
                        <p className="caption">Nuestro equipo dedicado.</p>
                    </div>
                    <div className="imageCard animate">
                        <img src="https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto.jpg" alt="Nuestros Productos" className="image" />
                        <p className="caption">Productos seleccionados cuidadosamente.</p>
                    </div>
                    <div className="imageCard animate">
                        <img src="https://www.questionpro.com/blog/wp-content/uploads/2023/06/2426-Portada-modelo-de-servicio-al-cliente.jpg" alt="Soporte al Cliente" className="image" />
                        <p className="caption">Soporte al cliente excepcional.</p>
                    </div>
                </div>

                {/* Llamada a la acción */}
                <div className="cta">
                    <h3>¿Listo para explorar?</h3>
                    <p>Descubre nuestra colección de productos diseñados para ti.</p>
                    <a href="/" className="ctaButton">
                        Explorar Productos
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
