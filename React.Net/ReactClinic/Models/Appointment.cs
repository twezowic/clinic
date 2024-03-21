using System.ComponentModel.DataAnnotations;
namespace Clinic.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int? PatientId { get; set; }
        public int DoctorId { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        [DataType(DataType.Time)]
        public DateTime Start { get; set; }
        public string? Comment { get; set; }
        public Appointment()
        {

        }

        public Appointment(int doctorId, DateTime date, DateTime start)
        {
            DoctorId = doctorId;
            Date = date;
            Start = start;
        }
    }
}