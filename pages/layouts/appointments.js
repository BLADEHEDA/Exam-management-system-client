// import node module libraries
import LayoutHeader from "components/bootstrap/layout-header/LayoutHeader";
import Link from "next/link";
import { Col, Row, Container, Image } from "react-bootstrap";

const LayoutVertical = () => {
  return (
    <LayoutHeader
    header='Appointments'
    buttonText='Apppointments'
    />
  );
};

export default LayoutVertical;
