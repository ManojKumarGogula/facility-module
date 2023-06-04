import React, { useState, createRef } from "react";
import { useNavigate } from "react-router";
import { Modal, Backdrop, Box } from "@mui/material";
import homeImage from "../../asserts/images/home.png";

const clubHouse =
  "https://cdn.dribbble.com/users/1672258/screenshots/15039344/media/d752af3c526f9fd5de1769187b23e65f.png?compress=1&resize=400x300";
const tennisCourt =
  "https://eliteclubs.com/wp-content/uploads/2021/05/Benefits-of-Playing-on-Indoor-Tennis-Courts-1-300x157.jpg";
const errorImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/2198px-Error.svg.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FacilityBookingModule = () => {
  let bookingInfo = JSON.parse(localStorage.getItem("BOOKINGDATA"));
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingData, setBookingData] = useState({ ...bookingInfo });
  const [openPaymentModal, setPaymentModal] = useState(false);
  const [showError, setError] = useState(false);

  const handleFacilityChange = (event) => {
    setSelectedFacility(event.target.value);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };
  const calculateBookingAmount = () => {
    let facilityData;
    if (bookingData[selectedFacility]) setError(true);
    if (selectedFacility === "clubhouse") {
      if (selectedTimeSlot === "10am-4pm") {
        facilityData = { clubhouse: 100 };
      } else if (selectedTimeSlot === "4pm-10pm") {
        facilityData = { clubhouse: 500 };
      }
    } else if (selectedFacility === "tennisCourt") {
      facilityData = { tennisCourt: 100 };
    }

    setBookingData({ ...bookingData, ...facilityData });
    localStorage.setItem(
      "BOOKINGDATA",
      JSON.stringify({ ...bookingData, ...facilityData })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleChange();
    calculateBookingAmount();
  };

  const handleChange = () => {
    setPaymentModal(!openPaymentModal);
    setError(false);
  };

  const renderContent = () => {
    if (showError)
      return (
        <div className="flex justify-center items-center flex-col">
          <img src={errorImg} className="h-[8vh] my-[2vh]" />
          <h1 className="text-14 front-400">Booking Failed, Already Booked</h1>
        </div>
      );

    return (
      <div className="flex justify-center flex-col items-center">
        <img
          src="https://img.uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/confirm-icon.svg"
          className="h-[8vh]"
        />
        <h1 className="text-24">Facility Booked </h1>

        <div className="h-[16vh]">
          <img
            src={selectedFacility == "tennisCourt" ? tennisCourt : clubHouse}
            className="object-fill w-full h-full"
          />
        </div>
        <div>Date:26-10-2020</div>
        <div>Price:{bookingData[selectedFacility]}</div>
      </div>
    );
  };
  const renderPaymentModel = () => {
    return (
      <Modal
        open={openPaymentModal}
        onClose={handleChange}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {renderContent()}
          <div className="flex justify-center items-center mt-[2vh]">
            <button
              onClick={handleChange}
              className="border-1 border-roundedboxbg shadow-4 p-2 px-6 rounded-2 hover:scale-110"
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      {renderPaymentModel()}
      <div className="flex justify-center items-center flex-col border-bluebg border-1 shadow-13 rounded-8 px-[6vw] py-[2vh]">
        <h1 className="text-24">Facility Booking Module</h1>
        <form onSubmit={handleSubmit} className="my-[10vh]">
          <div className="my-[8vh]">
            <label htmlFor="facility" className="mr-[3vw]">
              Facility:
            </label>
            <select
              id="facility"
              value={selectedFacility}
              onChange={handleFacilityChange}
              className="border-1 border-bluebg rounded-4 p-4"
            >
              <option value="">Select a facility</option>
              <option value="clubhouse">Clubhouse</option>
              <option value="tennisCourt">Tennis Court</option>
            </select>
          </div>
          {
            <div className="my-[8vh]">
              <label htmlFor="timeSlot" className="mr-[2vw]">
                Time Slot:
              </label>
              <select
                id="timeSlot"
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                className="border-1 border-bluebg rounded-4 p-4"
              >
                <option value="">Select a time slot</option>
                {selectedFacility && (
                  <option value="10am-4pm">10am - 4pm</option>
                )}
                {selectedFacility === "clubhouse" && (
                  <option value="4pm-10pm">4pm - 10pm</option>
                )}
              </select>
            </div>
          }
          {selectedFacility && selectedTimeSlot && (
            <button
              type="submit"
              className=" hover:border-redText mx-auto border-1 border-roundedboxbg shadow-4 p-2 px-6 rounded-2 hover:scale-110"
            >
              Book Now
            </button>
          )}
        </form>
        {/* {bookingData && selectedTimeSlot && (
          <p>
            Booking Amount: Rs. {bookingData[selectedFacility]}
            /hour
          </p>
        )} */}
      </div>
      <div onClick={()=>navigate("/")} >
        <img src={homeImage}  />
      </div>
    </div>
  );
};

export default FacilityBookingModule;
