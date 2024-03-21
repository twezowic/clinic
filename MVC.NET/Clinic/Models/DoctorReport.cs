using System.ComponentModel.DataAnnotations;

namespace Clinic.Models
{
    public class DoctorReport : Doctor
    {
        [Display(Name = "Working hour")]
        public TimeSpan WorkingHour { get; set; }
        [Display(Name = "Appointments hour")]
        public TimeSpan AppointmentHour { get; set; }

        public DoctorReport(Doctor doctor, TimeSpan all, TimeSpan actual) 
        { 
            Id = doctor.Id;
            FirstName = doctor.FirstName;
            LastName = doctor.LastName;
            IsAdmin = doctor.IsAdmin;
            Specialization = doctor.Specialization;
            WorkingHour = all;
            AppointmentHour = actual;
        }
    }
}
