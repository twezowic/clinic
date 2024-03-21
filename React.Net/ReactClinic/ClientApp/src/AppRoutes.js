
import DoctorList from "./components/Doctors/DoctorList";
import DoctorDetails from "./components/Doctors/DoctorDetails";
import DoctorEdit from "./components/Doctors/DoctorEdit";
import DoctorCreate from "./components/Doctors/DoctorCreate";
import Home from "./components/Home";
import PatientList from "./components/Patients/PatientList";
import PatientCreate from "./components/Patients/PatientCreate";
import PatientDetails from "./components/Patients/PatientDetails";
import PatientEdit from "./components/Patients/PatientEdit";
import Login from "./components/User/Login";
import ScheduleList from "./components/Schedules/ScheduleList";
import ScheduleCreate from "./components/Schedules/ScheduleCreate";
import ScheduleDetails from "./components/Schedules/ScheduleDetails";
import ScheduleEdit from "./components/Schedules/ScheduleEdit";
import UserProfile from "./components/User/Profile";
import AppointmentDetails from "./components/Appointments/AppoitnmentDetails";
import AppointmentEdit from "./components/Appointments/AppointmentEdit";
import AppointmentCreate from "./components/Appointments/AppointmentCreate";
import AppointmentList from "./components/Appointments/AppointmentList";


const AppRoutes = [
    {
    index: true,
    element: <Home />
    },
    {
    path: '/doctors',
    element: < DoctorList />
    },
    {
    path: "/doctors/:id",
    element: < DoctorDetails />
    },
    {
    path: "/doctors/:id/edit",
    element: < DoctorEdit />
    },
    {
    path: "/doctors/create",
    element: < DoctorCreate />
    },
    {
    path: "/patients",
    element: < PatientList />
    },
    {
    path: "/patients/create",
    element: < PatientCreate />
    },
    {
    path: "/patients/:id",
    element: < PatientDetails />
    },
    {
    path: "/patients/:id/edit",
    element: < PatientEdit />
    },
    {
    path: "/login",
    element: < Login />
    },
    {
    path: "/schedules",
    element: < ScheduleList />
    },
    {
    path: "/schedules/create",
    element: < ScheduleCreate />
    },
    {
    path: "/schedules/:id",
    element: < ScheduleDetails />
    },
    {
    path: "/schedules/:id/edit",
    element: < ScheduleEdit />
    },
    {
    path: "/profile/",
    element: < UserProfile />
    },
    {
    path: "/appointments/create",
    element: < AppointmentCreate />
    },
    {
    path: "/appointments/:id",
    element: < AppointmentDetails />
    },
    {
    path: "/appointments/:id/edit",
    element: < AppointmentEdit />
    },
    {
    path: "/appointments",
    element: < AppointmentList />
    },
];

export default AppRoutes;
