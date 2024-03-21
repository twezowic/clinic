using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clinic.Models
{
    public class Schedule
    {
        public int? Id { get; set; }
        public int doctorId { get; set; }
        [DataType(DataType.Date)]
        public DateTime Day { get; set; }
        [DataType(DataType.Time)]
        public DateTime Start { get; set; }
        [DataType(DataType.Time)]
        public DateTime End { get; set; }
    }
}
