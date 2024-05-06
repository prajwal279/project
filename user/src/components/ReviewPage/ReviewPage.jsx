import React, { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./ReviewPage.css";
import Rating from '@mui/material/Rating';
import axios from 'axios'
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';
import { UserContext } from "../../Contexts/UserContext";

// console.log(testSummary["positive","neg"])
// console.log(testSummary["positive", "neg", "1-star", "2-star", "3-star", "4-star", "5-star"]);


const ReviewPage = () => {
  const [reviews, setReviews] = useState({
    rating: '',
    review: '',
  });
  const location = useLocation();
  const [data, setData] = useState()

  const { setLoading } = useContext(UserContext);

  //  try{
  //   const response=await fetch('http://192.168.85.160',{
  //     method:'POST',
  //     headers:{
  //       'Content-type'
  //     }
  //   })
  //  }
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
  }, []);



  const fetchReviews = async (productUrl) => {
    try {
      setLoading(true)
      // axios.post("http://192.168.85.160:8000", { input: "productUrl" })

      // axios.post("http://192.168.29.136:8000/s", {"a": "b"} ).then(newres => {
      //     console.log(newres)
      //   });

      // console.log('hello');

      axios.post("http://localhost:5000/send_input", { input: productUrl }).then(res => {
        // console.log(res.data);
        setData(res.data)
        console.log(res.data)
        setLoading(false)

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
    <div className="w-full">
      <section className="testimonials">
        {/* <div className="testimonials-item1"> */}
        <div className="section-header">
          <h2 className="title">Product Reviews</h2>
        </div>
        <div className="testimonials-content w-6/12">
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
      <div className=" w-4/12 h-full flex flex-col justify-start items-center fixed right-20 top-0 overflow-y-scroll" >
        <div className="section-header">
          <h2 className="title">Product Summary</h2>
        </div>
        <div>

        </div>
        <div>
          <div >
            <h2 className="text-2xl text-gray-600 font-medium" >Positive Review</h2>
            <div className="m-3">
              {/* {testSummary["positive"]} */
              }
              {data?.summary.positive}
            </div>

          </div>

          <div >
            <h2 className="text-2xl text-gray-600 font-medium" >Negetive Review</h2>
            <div className="m-3">
              {data?.summary.negative}

            </div>
          </div>

          <div >
            <h2 className="text-2xl text-gray-600 font-medium">Review Summary <br /> ⭐ </h2>
            <div className="m-3">

              {data?.summary.star_1}

            </div>
          </div>
          <div >
            <h2 className="text-2xl text-gray-600 font-medium" >Review Summary <br />⭐⭐ </h2>
            <div className="m-3" >
              {data?.summary.star_2}

            </div>
          </div>
          <div >
            <h2 className="text-2xl text-gray-600 font-medium" >Review Summary <br />⭐⭐⭐ </h2>
            <div className="m-3" >
              {data?.summary.star_3}

            </div>
          </div>

          <div >
            <h2 className="text-2xl text-gray-600 font-medium" >Review Summary  <br /> ⭐⭐⭐⭐ </h2>
            <div className="m-3" >
              {data?.summary.star_4}

            </div>
          </div>

          <div >
            <h2 className="text-2xl text-gray-600 font-medium" >Review Summary <br /> ⭐⭐⭐⭐⭐ </h2>
            <div className="m-3">
              {data?.summary.star_5}

            </div>
          </div>
          {/* 
          

          

          

          */}
        </div>

      </div>
    </div>

  );
};

export default ReviewPage;
