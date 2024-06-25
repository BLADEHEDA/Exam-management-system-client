import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Head from "components/bootstrap/student/Head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import AppointmentBody from "components/bootstrap/apppointments/AppointmentBody";
import AppointmentModel from "components/bootstrap/apppointments/AppointmentModel";


const LayoutVertical = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [specificAppointments, setspecificAppointments] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const addAppointments = () => {
    router.push('/forms/addAppointments');
  }
  // Get all the appointments
  const handleFetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lecturerCourse");
      setAppointments(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error: ${error.response.status}`);
      } else if (error.request) {
        console.error("Request error: No response received");
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  useEffect(() => {
    handleFetchAppointments();
  }, []);

  const handleViewAppointment = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/lecturerCourse/${id}`);
      setspecificAppointments(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`HTTP error: ${error.response.status}`);
      } else if (error.request) {
        console.error("Request error: No response received");
      } else {
        console.error("Error:", error.message);
      }
    }
    setModalShow(true);
  };

  return (
    <>
      <LayoutHeader
        header='Appointments'
        buttonText='Apppointments'
        onClick={addAppointments}
      />
      <Head
        name='Lecturer Name'
        number='Course'
        value='Lecturer Email'
      />
      {/* <AppointmentBody/> */}
      <div className="mt-2">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment, id) => (
            <AppointmentBody
            key={id}
            data={appointment}
            handleViewAppointment={() => handleViewAppointment(appointment._id)}
            />
          ))
        ) : (
          <h4 className="p-7">No courses are available</h4>
        )}
      </div>
 {/* display the modal  to view the detailed information*/}
      <AppointmentModel
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={appointments.length > 0 ? specificAppointments : null}
      />

    </>


  );
};

export default LayoutVertical;
