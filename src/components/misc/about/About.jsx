/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';

// CONSTANTES
import SHARED from '@utils/global-constants';

// PUBLICO
import img1 from '@public/img/1024-1.jpg'
import img2 from '@public/img/1024-2.jpg'
import img3 from '@public/img/1024-3.jpg'

// COMPONENTES EXTERNOS
import { Carousel } from 'react-bootstrap';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
function About() {
    return (
      <div>
        <div className='about'>
          <h1><strong>MENÉAME EL COCHE</strong></h1>
        </div>
        <div>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 responsive"
                src={img1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Plataforma de compra y venta de vehículos</h3>
                <p>Los anuncios son votados por la comunidad y se posicinan en función a ellos.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 responsive"
                src={img2}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Totalmente gratuito</h3>
                <p>Los usuarios pueden subir anuncios, votarlos.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 responsive"
                src={img3}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>LLegue a un acuerdo</h3>
                <p>Regístrese y empiece a disfrutar de esta plataforma.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div>
            <h2>¿Qué somos?</h2>
            <p><strong>MENÉAME EL COCHE</strong> es una plataforma para comprar y vender su automóvil de manera totalmente gratuita. Ponemos en contacto compradores con vendedores.</p>
            <p>Si usted es un <strong>vendedor</strong>, podra poner su coche a la vente con un precio y una carácterísticas y la comunidad mediante votos decidirá si la oferta es adecuada.</p>
            <p>Si usted es un <strong>comprador</strong>, simplemente con ir al buscador y filtrando con las opciones que usted quiera le aparecerán en las primeras posiciones los vehículos que la comunidad cree que son los mejores en calidad/precio</p>
            <p>Si usted es un <strong>miembro</strong>, puede ver todos los productos y votar por ellos. Cuanta más experiencia adquieras sus valoraciones serán cada vez mas importantes.</p>
          </div>
          <div>
            <h2>¿Como empiezo?</h2>

            <p>Es muy facil de usar, simplemente <a href={SHARED.SIGNUP_PATH}><strong>cree una cuenta</strong></a> y ya podrá usar todos los beneficos que ofrece esta increible red social.</p>
          </div>
        </div>
        <div className='about'>
          <img src="https://media.giphy.com/media/Seb3lu2lYYmVq/giphy.gif" alt='the-gif' width='150' />
        </div>
      </div>
    );
  }

////////////
// EXPORT //
////////////
export default About;