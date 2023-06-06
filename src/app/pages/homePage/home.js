import React from "react";
import apartment from "../../asserts/images/apartment.jpg";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row xl:flex-row ">
      <div className="w-full md:w-[80vw] Xl:w-[80vw] h-[60vh] md:h-screen xl:h-screen">
        <img src={apartment} className=" w-full h-full" />
      </div>
      <div className="flex flex-col justify-center w-full md:w-[50%] xl:w-[50%] items-center">
        <div className="text-16 md:text-20 xl:text-24 text-bluebg font-700  mb-[6vh]">
          Manoj Apartments
        </div>
        <div className="text-10 font-sans w-5/6 text-justify">
          Welcome to our exquisite collection of luxury apartments that redefine
          contemporary living. Nestled in a prime location, these apartments
          offer a harmonious blend of style, comfort, and convenience. With
          their stunning views and an array of modern amenities, they are
          designed to elevate your lifestyle and provide you with an exceptional
          living experience. As you step into these thoughtfully designed
          apartments, you'll be greeted by a spacious and open floor plan that
          seamlessly combines living, dining, and kitchen areas. The interiors
          are adorned with high-quality finishes, including hardwood floors,
          elegant lighting fixtures, and tasteful color schemes that create an
          inviting ambiance.
        </div>
        {/* <div className="text-redText text-10 font-600 mt-10">Please clear local storage if you face any issue</div> */}
        <div>
          <button
            className=" py-[1vh] px-[2vw] rounded-8 my-[6vh] shadow-6 hover:scale-110"
            onClick={() => navigate("/register")}
          >
            Register Events
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
