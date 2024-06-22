import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { Col, Row, Container, Image ,Button} from "react-bootstrap";
import { useRouter } from "next/router";

const LayoutVertical = () => {
  const router = useRouter();
  const addLecturers = ()=>{
    router.push('/forms/addLecturers');
  }
  return (
    <>
    <LayoutHeader
    header='Lecturers'
    buttonText='Lecturer'
    onClick={addLecturers}
    />
    </>
  );
};

export default LayoutVertical;
