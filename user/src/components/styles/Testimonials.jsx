import React from 'react';
import './style.css';
function Testimonials() {
    return (
        <section className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2 className="title">Product Reviews</h2>
                </div>
                <div className="testimonials-content">
                    <div className="testimonials-slider js-testimonials-slider">
                        <div>
                            <div className="testimonials-item">
                                <div className="info">
                                    <img src="https://nurserylive.com/cdn/shop/products/nurserylive-plants-rose-red-plant-16969265840268_700x700.jpg?v=1674656824" alt="img" />
                                    <div className="text-box">
                                        <h3 className="name">Aswin A</h3>
                                        <span className="job">Awesome</span>
                                    </div>
                                </div>
                                <p>jencnnincc ecnici cecieioce cieiocioe ejccenioec ocnieccec cienjcioec swxjnwox wcijencec eciencienc</p>
                                <div className="rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </div>
                            {/* Add more testimonials-items here */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
