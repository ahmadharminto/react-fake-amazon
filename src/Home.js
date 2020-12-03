import React from 'react'
import './Home.scss'
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img src="https://cdn.ngoding-bae.my.id/img/slider/slider_1604851844_1110_480.jpg" className="home__image" alt=""/>
                <div className="home__row">
                    <Product 
                        id="1"
                        title="G1 Transformers Optimus Prime" 
                        image="https://cdn.ngoding-bae.my.id/img/product/thumbnail/400_400/14e10cee-d1d3-4739-afc9-49d42d552ea3.jpg" 
                        price={8.99}
                        rating={4} />
                    <Product 
                        id="2"
                        title="ARTICULATED DRAGONLORD (NOT DRAGONZORD)" 
                        image="https://cdn.ngoding-bae.my.id/img/product/thumbnail/800_800/683b879c-d8d0-4062-94bb-fbbf5734b19b.jpg" 
                        price={19.99}
                        rating={5} />
                </div>
                <div className="home__row">
                    <Product 
                        id="3"
                        title="G1 Transformers Prowl" 
                        image="https://cdn.ngoding-bae.my.id/img/product/thumbnail/800_800/a77612fc-6845-4209-acbb-9f76d9c88e6e.jpg" 
                        price={10}
                        rating={4} />
                    <Product 
                        id="4"
                        title="Transformable Sofa Robot 3.75 Inch" 
                        image="https://cdn.ngoding-bae.my.id/img/product/thumbnail/800_800/5cead9b6-223e-49c1-91b6-f8be8b66ad0d.jpg" 
                        price={19.99}
                        rating={3} />
                    <Product 
                        id="5"
                        title="G1 Transformers Ironhide" 
                        image="https://cdn.ngoding-bae.my.id/img/product/thumbnail/800_800/b5d7b027-d151-4564-890d-719f86e6ac3c.jpg" 
                        price={8.99}
                        rating={4} />
                    <Product 
                        id="6"
                        title="Jurassic Park SUV 1:18" 
                        image="https://cdn.ngoding-bae.my.id/img/product/thumbnail/800_800/b24db08a-e373-483d-961f-d4484cf159a8.jpg" 
                        price={5.99}
                        rating={5} />
                </div>
                <div className="home__row">

                </div>
            </div>
        </div>
    )
}

export default Home
