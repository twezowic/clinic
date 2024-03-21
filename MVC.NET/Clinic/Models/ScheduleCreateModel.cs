using Microsoft.AspNetCore.Mvc.Rendering;

namespace Clinic.Models
{
    public class ScheduleCreateModel
    {
        public Schedule? Schedule { get; set; }
        public List<Doctor>? DoctorsList { get; set; }
        public SelectList OpenTimes { get; set; }

        public void completeTimes(DateTime start, DateTime end, TimeSpan interval)
        {
            List<string> selectList = new List<string>();

            while (start <= end)
            {
                selectList.Add(start.ToString("HH:mm"));
                start = start.Add(interval);
            }
            OpenTimes = new SelectList(selectList);
        }
    }
}
