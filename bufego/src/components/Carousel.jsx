import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselComponent() {
  const carouselStyle = {
    backgroundColor: '#FFA500', //Narancssárga háttér
    padding: '20px',
    textAlign: 'left', //Szöveg balra igazítása
    color: 'white', //Fehér színű szöveg
  };
    const imageStyle = {
    maxWidth: '100%', //Képek maximális szélessége
    height: 'auto', //Magasság automatikus méretezése
  };

    return (
        <Carousel interval={null} controls={false}>
            <Carousel.Item>
                <div style={carouselStyle}>
                    <h2>Kerüld el a sort!</h2>
                    <p>Unod a sorban állást a szünetben? Rendeld meg kedvenced online pár kattintással, és csak vedd át!</p>
                    <img
                        className="d-block w-100"
                        src=""
                        style={imageStyle}
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={carouselStyle}>
                    <h2>A Diákok Kedvence!</h2>
                    <p>Ezt rendelitek a legtöbben! Ne maradj le te sem a pizzaszeletről!</p>
                    <img
                        className="d-block w-100"
                        src=""
                        style={imageStyle}
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={carouselStyle}>
                    <h2>Töltődj fel okosan</h2>
                    <p>Keress energiát adó, egészséges harapnivalókat! Saláták, gyümölcsök, joghurtok várnak.</p>
                    <img
                        className="d-block w-100"
                        src=""
                        style={imageStyle}
                    />
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;