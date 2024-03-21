using System.ComponentModel.DataAnnotations;

namespace ReactClinic.Models
{
    public class Patient : User
    {
        public Boolean IsActive { get; set; } = false;
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
    }
}
