using System.ComponentModel.DataAnnotations;

namespace Clinic.Models
{
    public class AppointmentFilled : Appointment
    {
        [Display(Name = "Doctor information")]
        public string doctorInfo { get; set; }
        [Display(Name = "Patient information")]
        public string patientInfo { get; set; }
        public AppointmentFilled(Appointment appointment, string dInfo, string pInfo)
        {
            DoctorId = appointment.DoctorId;
            PatientId = appointment.PatientId;
            Id = appointment.Id;
            Date = appointment.Date;
            Start = appointment.Start;
            Comment = appointment.Comment;
            doctorInfo = dInfo;
            patientInfo = pInfo;
        }
    }
}
