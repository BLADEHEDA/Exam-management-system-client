import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import Student from "components/bootstrap/student/Studentbody";
import StudentHead from "components/bootstrap/student/Head";
import axios from "axios";
import { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "components/bootstrap/modal/Modal";
import SignIn from "pages/authentication/sign-in";
import Head from "components/bootstrap/student/Head";
import ConfirmModal from "components/bootstrap/modal/ConfirmModal";

const LayoutVertical = () => {
  const router = useRouter();
  const [students, setStudents] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState()
  const [courseDetails, setCourseDetails] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const addStudents = () => {
    router.push('/forms/addStudents');
  }
  //get all the students 
  const handleFetcRequest = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data)
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
    handleFetcRequest()
  }, [])

  // View all the the students 
  const handleViewStudent = async (id) => {
    const chosenStudent = students.find((student) => student._id == id)
    setSelectedStudent(chosenStudent);
    const { enrollments } = chosenStudent
    setCourseDetails([])
    if (enrollments.length > 0) {
      for (let enrollment of enrollments) {
        try {
          const courses = await Promise.all(enrollments.map(enrollment => axios.get(`http://localhost:5000/courses/${enrollment}`)));
          const courseData = courses.map(course => course.data);
          setCourseDetails(courseData);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
      setModalShow(true);
    }
    else {
      setModalShow(true);
    }
  }

  // deletet he student
  const handleDeleteStudent = (id) => {
    setStudentToDelete(id)
    setShowModal(true)
  }
  // confirm delete 
  const handleDeleteConfirm= async()=>{
    try {
      const deletedStudents = axios.delete(`http://localhost:5000/students/${studentToDelete}`)
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentToDelete));
      setStudentToDelete(null)
    }
    catch (error) {
      console.error("Error fetching courses:", error);
    }
    setShowModal(false)
  }

  return (
    <>
      <div>
        <LayoutHeader
          header='Students'
          buttonText='Student'
          onClick={addStudents}
        />
        <div>
          <Head
            name='Student'
            number='Matricule'
            value=' Phone Number '
          />
        </div>
        {students.length > 0 ? (
          students.map((student, id) => (
            <Student
              key={id}
              id={student._id}
              data={student}
              handleViewStudent={() => { handleViewStudent(student._id)}}
              handleDeleteStudent={() => handleDeleteStudent(student._id)}
            />
          ))
        ) : (
          <h4 className="p-7">No student is available</h4>
        )
        }
        { }
        <>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={selectedStudent}
            courseData={courseDetails}
          />
        </>
        <>
      {ShowModal &&
      <ConfirmModal
      value='Student'
      onClose={()=> setShowModal(false)}
      OnConfirm={()=> handleDeleteConfirm()}
      />
    }
      </>
      </div>
    </>

  );
};

export default LayoutVertical;
