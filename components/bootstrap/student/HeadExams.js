
const HeadExams = ({name,number,value}) => {
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
                   <div className='me-4'>{number}</div>
                   <div className='me-4'>Exam</div>
                </div>
                <div className={Style}>   
                    Options
                </div>
            </div>
        </div>
    );
}

export default HeadExams;
