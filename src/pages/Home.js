import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css';  // Importamos el archivo CSS de estilos para Home.js

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a nuestra tienda online</h1>
        <p className="intro-text">
          Descubre los mejores productos promocionales de los videojuegos más populares
          al mejor precio. ¡No te lo puedes perder!
        </p>
      </header>

      <section className="intro-section">
        <div className="intro-text">
          <h2>¿Qué ofrecemos?</h2>
          <p>
            En nuestra tienda online, podrás encontrar productos exclusivos y promocionales
            basados en tus videojuegos favoritos. Tenemos una gran variedad de artículos
            para que puedas lucir y disfrutar lo mejor del mundo gamer.
          </p>
          <p>
            Desde ropa, figuras coleccionables, hasta accesorios únicos, cada producto refleja
            la esencia de los videojuegos más populares. ¡Haz que tu pasión se vea reflejada en
            los objetos que usas a diario!
          </p>
        </div>

        <div className="image-container">
          <img src="path_to_your_image.jpg" alt="Promocionales de videojuegos" className="promo-image" />
        </div>
      </section>

      <section className="features">
        <h3>Productos Destacados</h3>
        <div className="feature-cards">
          <div className="feature-card">
            <h4>Camisetas Exclusivas</h4>
            <p>Vistiendo lo mejor de tus videojuegos favoritos.</p>
            <div className="card-image">
              <Link to="/productos">
                <img src="path_to_image1.jpg" alt="Camisetas" />
              </Link>
            </div>
          </div>
          <div className="feature-card">
            <h4>Figuras Coleccionables</h4>
            <p>PRONTO</p>
            <div className="card-image">
              <img src="path_to_image2.jpg" alt="Figuras" />
            </div>
          </div>
          <div className="feature-card">
            <h4>Accesorios Gamer</h4>
            <p>PRONTO</p>
            <div className="card-image">
              <img src="path_to_image3.jpg" alt="Accesorios" />
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Tienda Online - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Home;
