using Newtonsoft.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace Clinic.Models
{
    public abstract class User
    {
        public int Id { get; set; }
        public string Login {  get; set; }
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 6)]
        public string Password { get; set; }
        [Display(Name = "First name")]
        public string FirstName { get; set; }
        [Display(Name = "Last name")]
        public string LastName { get; set; }

    }
}
