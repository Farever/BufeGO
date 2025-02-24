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
        <Carousel interval={null}>
            <Carousel.Item>
                <div style={carouselStyle}>
                    <h2>Mi is az a BüféGO?</h2>
                    <p>Ha érdekel a szotri, olvasd el a cikket.</p>
                    <img
                        className="d-block w-100"
                        src="https://i.imgur.com/your_first_image.png"
                        alt="First slide"
                        style={imageStyle}
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={carouselStyle}>
                    <h2>Mi is az a BüféGO?</h2>
                    <p>Ha érdekel a szotri, olvasd el a cikket.</p>
                    <img
                        className="d-block w-100"
                        src="https://i.imgur.com/your_second_image.png"
                        alt="Second slide"
                        style={imageStyle}
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={carouselStyle}>
                    <h2>Mi is az a BüféGO?</h2>
                    <p>Ha érdekel a szotri, olvasd el a cikket.</p>
                    <img
                        className="d-block w-100"
                        src="https://i.imgur.com/your_third_image.png"
                        alt="Third slide"
                        style={imageStyle}
                    />
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;