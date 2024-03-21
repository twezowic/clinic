using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ReactClinic.Models;
using Clinic.Models;

namespace ReactClinic.Data
{
    public class ReactClinicContext : DbContext
    {
        public ReactClinicContext (DbContextOptions<ReactClinicContext> options)
            : base(options)
        {
        }

        public DbSet<ReactClinic.Models.Doctor> Doctor { get; set; } = default!;

        public DbSet<ReactClinic.Models.Patient>? Patient { get; set; }

        public DbSet<Clinic.Models.Schedule>? Schedule { get; set; }

        public DbSet<Clinic.Models.Appointment>? Appointment { get; set; }
    }
}
