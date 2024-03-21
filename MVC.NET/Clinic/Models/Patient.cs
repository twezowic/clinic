using System.ComponentModel.DataAnnotations;

namespace Clinic.Models
{
    public class Patient : User
    {
        public Boolean IsActive { get; set; } = false;
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        public string Info()
        {
            return FirstName + ' ' + LastName;
        }
    }
}
