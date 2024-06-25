import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "components/bootstrap/student/Head"; 
import LecturerBody from "components/bootstrap/lecturer/LecturerBody"; 
import axios from "axios";
import { useEffect, useState } from "react";
import LecturerModal from "components/bootstrap/modal/LecturerModal";
import ConfirmModal from "components/bootstrap/modal/ConfirmModal"; 

const LayoutVertical = () => {
  const router = useRouter();
  const [lecturers, setLecturers] = useState([]); 

  const [modalShow, setModalShow] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(); 
  const [courseDetails, setCourseDetails] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [lecturerToDelete, setLecturerToDelete] = useState(null); 

  const addLecturers = () => {
    router.push('/forms/addLecturers');
  }

  // Fetch all the lecturers
  const handleFetchRequest = () => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setLecturers(response.data); 
      })
      .catch((error) => {
        if (error.response) {
          console.error(`HTTP error: ${error.response.status}`);
        } else if (error.request) {
          console.error("Request error: No response received");
        } else {
          console.error("Error:", error.message);
        }
      });
  }

  useEffect(() => {
    handleFetchRequest();
  }, []);

  const handleViewLecturer = async (id) => {
    const chosenLecturer = lecturers.find((lecturer) => lecturer._id === id); 
    setSelectedLecturer(chosenLecturer); 
    
    try {
      if (chosenLecturer && chosenLecturer.courses && chosenLecturer.courses.length > 0) {
        const coursesTaught = await Promise.all(
          chosenLecturer.courses.map(courseId => axios.get(`http://localhost:5000/courses/${courseId}`))
        );
        const courseData = coursesTaught.map(course => course.data);
        console.log(courseData);
        setCourseDetails(courseData);
        setModalShow(true);
      } else {
        // Handle case where no courses are found
        setCourseDetails([]);
        setModalShow(true);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  // Delete the lecturer
  const handleDeleteLecturer = (id) => {
    setLecturerToDelete(id); 
    setShowModal(true);
  }
  
  // Confirm delete 
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${lecturerToDelete}`);
      setLecturers((prevLecturers) => prevLecturers.filter((lecturer) => lecturer._id !== lecturerToDelete)); // Adjusted variable names
      setLecturerToDelete(null);
    } catch (error) {
      console.error("Error deleting lecturer:", error);
    }
    setShowModal(false);
  }

  return (
    <>
      <LayoutHeader
        header='Lecturers'
        buttonText='Lecturer'
        onClick={addLecturers}
      />
      <Head
        name='Lecturer'
        number='phone Number'
        value=' email'
      />
      {lecturers.length > 0 ? (
        lecturers.map((lecturer, id) => (
          lecturer.role === 'lecturer' && 
          <LecturerBody
            key={id}
            id={lecturer._id}
            data={lecturer}
            handleViewStudent={() => { handleViewLecturer(lecturer._id) }} 
            handleDeleteStudent={() => handleDeleteLecturer(lecturer._id)} 
          />
        ))
      ) : (
        <h4 className="p-7">No lecturer is available</h4> 
      )}
      <LecturerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={selectedLecturer}
        courseData={courseDetails}
      />
      {showModal &&
        <ConfirmModal
          value='Lecturer'
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDeleteConfirm()}
        />
      }
    </>
  );
};

export default LayoutVertical;
