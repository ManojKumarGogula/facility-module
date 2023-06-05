import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { Modal, Backdrop, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";

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

const useStyles = makeStyles({
  datePicker: {
    "& .MuiOutlinedInput-root": {
      border: "none",
      outline: "none",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
      borderColor: "transparent",
    },
  },
});
const FacilityBookingModule = () => {
  let bookingInfo = JSON.parse(localStorage.getItem("BOOKINGDATA"));
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [openPaymentModal, setPaymentModal] = useState(false);
  const [showError, setError] = useState(false);
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (bookingInfo) setBookingData([...bookingInfo]);
  }, []);

  const handleFacilityChange = (event) => {
    setSelectedFacility(event.target.value);
  };

  const calculateBookingAmount = () => {
    let facilityData;

    const currentDate = moment().format("YYYY-MM-DD");
    const errorLog = bookingData.map((item, index) => {
      console.log(
        item.date,
        currentDate,
        item.event,
        selectedFacility,
        "map",
        moment(item.date).isSame(currentDate),
        moment(item.date).isSame(currentDate) && item.event == selectedFacility
      );
      if (
        moment(item.date).isSame(currentDate) &&
        item.event == selectedFacility
      ) {
        return true;
      }
    });
    if (errorLog[0]) {
      setError(true);
      return;
    }

    const initialTime = getHours(startTime);
    const finalTime = getHours(endTime);
    const eventHours = finalTime - initialTime;
    if (selectedFacility == "clubhouse") {
      if (initialTime > 10 && finalTime < 16) {
        facilityData = { event: "clubhouse", cost: eventHours * 100 };
      } else if (initialTime > 16 && finalTime < 22) {
        facilityData = { event: "clubhouse", cost: eventHours * 500 };
      }
    } else if (selectedFacility == "tennisCourt") {
      facilityData = { event: "tennisCourt", cost: eventHours * 50 };
    }

    setBookingData([
      ...bookingData,
      {
        ...facilityData,
        date: date.format("YYYY-MM-DD"),
        startTime: startTime,
        endTime: endTime,
      },
    ]);
    localStorage.setItem(
      "BOOKINGDATA",
      JSON.stringify([
        ...bookingData,
        {
          ...facilityData,
          date: date.format("YYYY-MM-DD"),
          startTime: startTime,
          endTime: endTime,
        },
      ])
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

  const getHours = (timeArg) => {
    const time = moment(timeArg);
    const hours = time.hours();
    const minutes = time.minutes();
    return hours + minutes / 60;
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
        style={{ zIndex: 999 }}
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
    <div className="flex flex-col justify-center items-center h-screen  ">
      {renderPaymentModel()}
      <div className="flex justify-center items-center flex-col border-bluebg border-1 shadow-13 rounded-8 px-[6vw] py-[2vh] w-[80%] md:w-auto xl:w-auto">
        <h1 className="text-14 md:text-20 xl:text-24 mt-[1vh]">
          Facility Booking Module
        </h1>
        <form onSubmit={handleSubmit} className="my-[10vh]">
          <div className="flex flex-col md:flex-col xl:flex-row xl:items-center">
            <label htmlFor="facility" className="mr-[3vw]">
              Facility:
            </label>
            <select
              id="facility"
              value={selectedFacility}
              onChange={handleFacilityChange}
              className="border-1 border-bluebg rounded-4 p-10 w-[50vw] md:w-[30vw] xl:w-[11vw]"
            >
              <option value="" className="my-8">
                Select a facility
              </option>
              <option value="clubhouse" className="my-8">
                Clubhouse
              </option>
              <option value="tennisCourt" className="my-8">
                Tennis Court
              </option>
            </select>
          </div>
          <div className="flex flex-col md:flex-col xl:flex-row xl:items-center my-[2vh]">
            <div className="mr-[4.2vw]">Date:</div>
            <div className=" w-[50vw] md:w-[30vw] xl:w-[11vw] border-1 border-bluebg rounded-4">
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
                className={classes.datePicker}
                disablePast
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-col xl:flex-row xl:items-center my-[2vh]">
            <div className="mr-[1.6vw]"> Start Time:</div>
            <div className=" w-[50vw] md:w-[30vw] xl:w-[11vw] border-1 border-bluebg rounded-4">
              <TimePicker
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                ampm={false}
                minTime={moment().hours(10).minutes(0)}
                maxTime={moment().hours(22).minutes(0)}
                className={classes.datePicker}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-col xl:flex-row xl:items-center my-[2vh]">
            <div className="mr-[2vw]"> End Time:</div>

            <div className=" w-[50vw] md:w-[30vw] xl:w-[11vw] border-1 border-bluebg rounded-4">
              <TimePicker
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                ampm={false} // Set to "false" for 24-hour format
                minTime={moment().hours(10).minutes(0)}
                maxTime={moment().hours(22).minutes(0)}
                className={classes.datePicker}
              />
            </div>
          </div>
          {selectedFacility && startTime && endTime && date && (
            <button
              type="submit"
              className=" hover:border-redText mx-auto border-1 border-roundedboxbg shadow-4 p-2 px-6 rounded-2 hover:scale-110"
            >
              Book Now
            </button>
          )}
        </form>
      </div>
      <div onClick={() => navigate("/")}>
        <img src={homeImage} />
      </div>
    </div>
  );
};

export default FacilityBookingModule;
