using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace Clinic.Models
{
    public class DoctorSpecializationViewModel
    {
        public List<Doctor>? Doctors { get; set; }
        public SelectList? Specializations { get; set; }
        public Specialization? DoctorSpecialization { get; set; }
    }
}