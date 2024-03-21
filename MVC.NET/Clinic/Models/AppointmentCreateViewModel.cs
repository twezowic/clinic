using Microsoft.AspNetCore.Mvc.Rendering;

namespace Clinic.Models
{
    public class AppointmentCreateViewModel
    {
        public List<Doctor>? DoctorsList { get; set; }
        public List <Appointment> AppointmentsList { get; set; }
        public SelectList? Specializations { get; set; }
        public Specialization? DoctorSpecialization { get; set; }
        public Appointment appointment { get; set; }
    }
}
