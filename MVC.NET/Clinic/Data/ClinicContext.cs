using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Clinic.Models;

namespace Clinic.Data
{
    public class ClinicContext : DbContext
    {
        public ClinicContext (DbContextOptions<ClinicContext> options)
            : base(options)
        {
        }

        public DbSet<Clinic.Models.User> User { get; set; } = default!;

        public DbSet<Clinic.Models.Doctor>? Doctor { get; set; }

        public DbSet<Clinic.Models.Patient>? Patient { get; set; }

        public DbSet<Clinic.Models.Schedule>? Schedule { get; set; }

        public DbSet<Clinic.Models.Appointment>? Appointment { get; set; }
    }
}
