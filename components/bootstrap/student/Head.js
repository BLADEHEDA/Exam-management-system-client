import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const Head = ({name,number,value}) => {
    const Style = 'col-3 d-flex justify-content-center border py-2';
    return (
        <div className="container mx-6">
            <div className="row">
                <div className={Style}>
                   {name}
                </div>
                <div className={Style}>
                    {value}   
                </div>
                <div className={Style}>
                   {number}
                </div>
                <div className={Style}>   
                    Options
                </div>
            </div>
        </div>
    );
}

export default Head;
