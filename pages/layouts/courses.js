import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Head from "components/bootstrap/student/Head";
import CourseBody from "components/bootstrap/course/CourseBody";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseModal from "components/bootstrap/modal/CourseModal";
import ConfirmModal from "components/bootstrap/modal/ConfirmModal";

const LayoutVertical = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [studentsDetails, setStudentsDetails] = useState([]);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const addCourses = () => {
    router.push('/forms/addCourses');
  };

  // Get all the courses
  const handleFetchCourses = () => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        setCourses(response.data);
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
  };

  useEffect(() => {
    handleFetchCourses();
  }, []);

  // View a course
  const handleViewCourse = async (id) => {
    const chosenCourse = courses.find((course) => course._id == id);
    setSelectedCourse(chosenCourse);
    const { enrollments } = chosenCourse;
    setStudentsDetails([]);
    if (enrollments.length > 0) {
      for (let enrollment of enrollments) {
        try {
          const students = await Promise.all(enrollments.map(enrollment => axios.get(`http://localhost:5000/students/${enrollment}`)));
         const studentData = students.map(student => student.data);
         setStudentsDetails(studentData);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    }
    setModalShow(true);
  };

  // Delete a course
  const handleDeleteCourse = (id) => {
    setCourseToDelete(id);
    setShowModal(true)
 
  };
  // confirm the delete 
  const handleDeleteConfirm = async()=>{
    try {
      await axios.delete(`http://localhost:5000/courses/${courseToDelete}`);
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseToDelete));
      setCourseToDelete(null);
      setShowModal(false)
    } catch (error) {
      console.error("Error deleting course:", error);
    }
    setShowModal(false)
  }
  return (
    <>
      <LayoutHeader
        header='Courses'
        buttonText='Course'
        onClick={addCourses}
      />
      <Head
        name='Course Name'
        number='Course Code'
        value='Credit Value'
      />
      <div className="mt-2"></div>
      {courses.length > 0 ? (
        courses.map((course,id) => (
          <CourseBody
            key={id}
            id={course._id}
            data={course}
            handleViewCourse={() => handleViewCourse(course._id)}
            handleDeleteCourse={() => handleDeleteCourse(course._id)}
          />
        ))
      ) : (
        <h4 className="p-7">No courses are available</h4>
      )}
      <>
        <CourseModal
            show={modalShow}
            onHide={() => setModalShow(false)}  
            data={selectedCourse}
            studentData={studentsDetails}
        />
      </>
      <>
      {ShowModal &&
      <ConfirmModal
      value='Course'
      onClose={()=> setShowModal(false)}
      onConfirm={()=> handleDeleteConfirm()}
      />
    }
      </>
    </>
  );
};

export default LayoutVertical;
