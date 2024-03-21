using System.ComponentModel.DataAnnotations;

namespace ReactClinic.Models
{
    public class Doctor : User
    {
        [Required]
        public String Specialization { get; set; }
        [Display(Name = "Admin")]
        [Required]
        public Boolean IsAdmin { get; set; } = false;
    }
}
