import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ReviewPage.css";
import Rating from '@mui/material/Rating';
import axios from 'axios'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

// console.log(testSummary["positive","neg"])
// console.log(testSummary["positive", "neg", "1-star", "2-star", "3-star", "4-star", "5-star"]);


const ReviewPage = () => {
  const [reviews, setReviews] = useState({
    rating: '',
    review: '',
  });
  const location = useLocation();
  const [data, setData] = useState()


  // const ReviewPage = () => {
  //   const [summary, setSummary] = useState({
  //     rating:'',
  //     review:'',
  //   });
  //   const location = useLocation();
  //   const [data, setData] = useState([])


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
        // console.log("Hii"+JSON.stringify(data[0]).review)
      })
      // fetch("http://localhost:5000/send_input",
      //   {
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     method: "POST",
      //     body: JSON.stringify({ input: productUrl })
      //   })
      //   .then(function (res) { console.log(res) })
      //   .catch(function (res) { console.log(res) })
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };



  const config = {
    dictionaries: [names]
  }


  return (
    <div className="flex flex-row gap-5">
      <section className="testimonials">
        {/* <div className="testimonials-item1"> */}
        <div className="section-header">
          <h2 className="title">Product Reviews</h2>
        </div>
        <div className="testimonials-content">
          <div className="testimonials-slider js-testimonials-slider">
            <div>
              {data?.review.data.map((review, index) => {
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
        {/* </div> */}
      </section>
      <div className="testimonials-item w-4/12" >
        <div className="section-header">
          <h2 className="title">Product Summary</h2>
        </div>

        <div className="testimonials-item1">
          <div >Positive Review</div>
          <div className="testimonials-item">
            {/* {testSummary["positive"]} */}
            {data?.summary.key1}
          </div>
        </div>
        <div className="testimonials-item">
          <div >Negetive Review</div>
          <div className="testimonials-item">
            {data?.summary.key2}

            {/* {testSummary["negetive"]} */}
          </div>
        </div>

        <div className="testimonials-item">
          <div>⭐ Review Summary</div>
          <div className="testimonials-item">
            {/* {testSummary["1-star"]} */}
            {data?.summary.key1}

          </div>
        </div>

        <div className="testimonials-item">
          <div >⭐⭐ Review Summary</div>
          <div className="testimonials-item">
            {/* {testSummary["2-star"]} */}
            {data?.summary.key1}

          </div>
        </div>

        <div className="testimonials-item">
          <div >⭐⭐⭐ Review Summary</div>
          <div className="testimonials-item">
            {/* {testSummary["3-star"]} */}
            {data?.summary.key1}

          </div>
        </div>

        <div className="testimonials-item">
          <div >⭐⭐⭐⭐ Review Summary</div>
          <div className="testimonials-item">
            {/* {testSummary["4-star"]} */}
            {data?.summary.key1}

          </div>
        </div>

        <div className="testimonials-item">
          <div >⭐⭐⭐⭐⭐ Review Summary</div>
          <div className="testimonials-item">
            {/* {testSummary["5-star"]} */}
            {data?.summary.key1}

          </div>
        </div>
      </div>
    </div>

  );
};

export default ReviewPage;
