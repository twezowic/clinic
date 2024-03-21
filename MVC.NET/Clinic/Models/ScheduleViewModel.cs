using Microsoft.AspNetCore.Mvc.Rendering;

namespace Clinic.Models
{
    public class ScheduleViewModel
    {
        public List<Schedule> Schedules { get; set; }
        public List<Doctor> Doctors { get; set; }
        public ScheduleViewModel(List<Schedule> schedules, List<Doctor> doctors)
        {
            Schedules = schedules;
            Doctors = doctors;
        }
    }
}
