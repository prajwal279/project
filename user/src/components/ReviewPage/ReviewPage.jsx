// // ReviewPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const ReviewPage = () => {
//   const [reviews, setReviews] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const productUrl = searchParams.get('url');

//     // Mocking fetching reviews from the provided URL
//     fetchReviews(productUrl);
//   }, [location.search]);

//   const fetchReviews = (productUrl) => {
//     // Here you would typically make an API call to fetch reviews
//     // For this example, I'm just mocking the data
//     const mockReviews = [
//       'Design: Sleek and stylish design with premium materials.',
//       'Display: Vibrant and sharp OLED display with True Tone technology.',
//       'Performance: Blazing fast performance thanks to the latest A-series chip.',
//       'Camera: Excellent camera quality with impressive low-light performance and advanced photography features.',
//       'Battery Life: Improved battery life compared to previous models, but may still require daily charging with heavy usage.',
//       'Software: Smooth and intuitive user experience with regular updates and a wide range of apps available on the App Store.',
//       'Security: Enhanced security features such as Face ID for biometric authentication and robust privacy settings.',
//       'Connectivity: Fast 5G connectivity for faster download and streaming speeds (on compatible models).',
//       'Price: Premium pricing compared to other smartphones on the market, but offers great value for its features and performance.',
//       'Overall: The iPhone delivers a premium smartphone experience with top-notch build quality, performance, and features, making it a popular choice among users worldwide.'
//     ];
//     setReviews(mockReviews);
//   };

//   return (
//     <div classNameName='review-container'>
//       <h1>Product Reviews</h1>
//       <ul classNameName='reviews'>
//         {reviews.map((review, index) => (
//           <li key={index}>{review}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReviewPage;

// ReviewPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import testReviews from "../reviews.json";
import "./ReviewPage.css";
import Rating from '@mui/material/Rating';
import axios from 'axios'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';


const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const [data, setData] = useState()



  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productUrl = searchParams.get("url");
    console.log(productUrl)


    // Fetch reviews from JSON file
    fetchReviews(productUrl);
  }, [location.search]);

  const fetchReviews = async (productUrl) => {
    try {

      axios.post("http://localhost:5000/send_input", { input: productUrl }).then(res => {
        console.log(res.data)
        setData(res.data)
      })
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };


  const config = {
    dictionaries: [names]
  }
  
  
  return (
    // <div classNameName='review-container'>
    //   <h1>Product Reviews</h1>
    //   <ul classNameName='reviews'>
    //     {testReviews.data.map((review, index) => (
    //       <li key={index}>
    //         Rating: {review.rating}, Review: {review.review}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="flex flex-row gap-5">
      <section className="testimonials">
        <div className="section-header">
          <h2 className="title">Product Reviews</h2>
        </div>
        <div className="testimonials-content">
          <div className="testimonials-slider js-testimonials-slider">
            <div>
              {testReviews.data.map((review, index) => {
                return (
                  <div className="testimonials-item">
                    <div className="info">
                      <img
                        src="https://i.pngimg.me/thumb/f/720/m2i8m2A0K9H7N4m2.jpg" alt="Image"
                      />
                      <div className="" text-box>
                        <h3 className="name">{uniqueNamesGenerator(config)}</h3>
                        <span className="" job>
                          <Rating name="read-only" value={review.rating} readOnly />
                        </span>
                      </div>
                    </div>
                    <p>{review.review}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </section>
      <div className="testimonials-item w-4/12" >
        {data}
      </div>
    </div>

  );
};

export default ReviewPage;
