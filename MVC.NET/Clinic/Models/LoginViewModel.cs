using System.ComponentModel.DataAnnotations;

namespace Clinic.Models
{
    public class LoginViewModel
    {
        public string Login { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public string UserType { get; set; }
    }
}
