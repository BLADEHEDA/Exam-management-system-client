import {
	Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';

export const ProjectsStats = [
    {
       id:1,
       title : "Students",
       value : 19,
       icon: <Briefcase size={18}/>,
    },
    {
        id:2,
        title : "Courses",
        value : 7,
        icon: <ListTask size={18}/>,
     },
     {
        id:3,
        title : "Lecturers",
        value : 5,
        icon: <People size={18}/>,
     },
     {
        id:4,
        title : "Enrollments",
        value : '4',
        icon: <Bullseye size={18}/>,
     }
];
export default ProjectsStats;
