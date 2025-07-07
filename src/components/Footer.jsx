import React from 'react';
import { Link } from 'react-router-dom'; 

// Importa tus logos de medios de pago
import LogoMaster from '../assets/pagos/LogoMaster.png';
import LogoMP from '../assets/pagos/LogoMP.png';
import LogoVisa from '../assets/pagos/LogoVisa.png';
import LogoAmericanExpress from '../assets/pagos/LogoAmerican.png'; 

// Importa los iconos de redes sociales de React Icons
import { 
  FaFacebook, 
  FaTwitter, 
  FaYoutube, 
  FaInstagram, 
  FaLinkedin, 
  FaTiktok,
  FaPhone,     
  FaWhatsapp,  
  FaEnvelope,
  FaMapMarkerAlt  
} from 'react-icons/fa';
import logoColchones from '../assets/LogoColchones.png'; // Importa logo para el footer

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3"> {/* pt-5 para padding superior, pb-3 para padding inferior */}
      <div className="container">
        <div className="row">
          {/* Columna 1: Información de la empresa */}
          <div className="col-md-3 mb-4">
            <h5 className="text-white mb-3">Información</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Quiénes somos</a></li>
              <li><a href="#" className="text-white text-decoration-none">Preguntas frecuentes</a></li>
              <li><a href="#" className="text-white text-decoration-none">Garantías</a></li>
            </ul>
          </div>

          {/* Columna 2: Contacto */}
          <div className="col-md-3 mb-4">
            <h5 className="text-white mb-3">Contacto</h5>
            <ul className="list-unstyled">
              <li>
                <FaPhone className="me-2" /> 
                Teléfono: +54 11 1234-5678 
              </li>
              <li>
                <FaWhatsapp className="me-2" />
                WhatsApp: +54 911 8765-4321 
              </li>
              <li>
                <FaEnvelope className="me-2" /> 
                Email: info@colchonera.com 
              </li>
              <li>
                <FaMapMarkerAlt className="me-2" />
                Sucursales: <a href="https://maps.app.goo.gl/oxSaN5K3kmR74Qj1A" className="text-white text-decoration-none">Ver mapa</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Políticas y Legales */}
          <div className="col-md-3 mb-4">
            <h5 className="text-white mb-3">Políticas y Legales</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Política de envío</a></li>
              <li><a href="#" className="text-white text-decoration-none">Política de retiros</a></li>
              <li><a href="#" className="text-white text-decoration-none">Legal - Bases y condiciones</a></li>
            </ul>
          </div>

          {/* Columna 4: Logo, Redes Sociales y Medios de Pago */}
          <div className="col-md-3 mb-4 text-center text-md-start"> {/* text-center en móviles, text-md-start en desktop */}
            <Link className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 text-decoration-none" to="/">
              <span className="text-white fw-bold fs-5">Colchonera React</span>
            </Link>

            <div className="mb-3">
              <h6 className="text-white mb-2">Síguenos:</h6>
              <div className="d-flex justify-content-center justify-content-md-start gap-3"> {/* gap-3 para espacio entre iconos */}
                <a href="#" className="text-white"><FaFacebook size={24} /></a>
                <a href="#" className="text-white"><FaTwitter size={24} /></a>
                <a href="#" className="text-white"><FaYoutube size={24} /></a>
                <a href="#" className="text-white"><FaInstagram size={24} /></a>
                <a href="#" className="text-white"><FaLinkedin size={24} /></a>
                <a href="#" className="text-white"><FaTiktok size={24} /></a>
              </div>
            </div>

            <div>
              <h6 className="text-white mb-2">Métodos de Pago:</h6>
              <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2"> {/* flex-wrap y gap para logos de pago */}
                <img src={LogoVisa} alt="Visa" style={{ height: '30px' }} className="me-2" />
                <img src={LogoMaster} alt="Mastercard" style={{ height: '30px' }} className="me-2" />
                <img src={LogoMP} alt="Mercado Pago" style={{ height: '30px' }} />
                <img src={LogoAmericanExpress} alt="American Express" style={{ height: '30px' }} className="me-2" /> 
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-secondary" /> {/* Línea divisoria */}
        <div className="text-center py-2">
          <small>&copy; {new Date().getFullYear()} Colchonera React - Todos los derechos reservados</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;