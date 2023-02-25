import { Link } from "react-router-dom";

const StudentRoutes = ({ allStudents, handleStudentChange }) => {

    const listItems = allStudents.map(item =>
        <span
            key={item}
            onClick={handleStudentChange}>
            <Link to={item}>{item}</Link>
        </span>)

    return (
        <div className="routing">
            {listItems}
            <Link to="/">View all students</Link>
        </div>
    )
};

export default StudentRoutes;