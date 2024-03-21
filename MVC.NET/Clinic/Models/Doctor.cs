using System.ComponentModel.DataAnnotations;

namespace Clinic.Models

{
    public enum Specialization
    {
        Domowy,
        Laryngolog,
        Dermatolog,
        Okulista,
        Neurolog,
        Ortopeda,
        Pediatra
    }
    public class Doctor : User
    {
        public Specialization Specialization { get; set; }
        [Display(Name = "Admin")]
        public Boolean IsAdmin { get; set; } = false;
        public string Info ()
        {
            return Specialization.ToString () + ' ' + FirstName[0] + '.'+ LastName;
        }
    }
}
