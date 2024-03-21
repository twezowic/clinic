using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Clinic.Data;
using System;
using System.Linq;
using Clinic.Models;

namespace Clinic.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ClinicContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ClinicContext>>()))
            {
                if (context.Patient.Any())
                {
                    return;   // DB has been seeded
                }
                if (context.Doctor.Any())
                {
                    return;   // DB has been seeded
                }
                if (context.Schedule.Any())
                {
                    return;   // DB has been seeded
                }
                if (context.Appointment.Any())
                {
                    return;   // DB has been seeded
                }
                context.Patient.AddRange(
                    new Patient
                    {
                        FirstName = "Jan",
                        LastName = "Kowalski",
                        Login = "jan",
                        Password = "B",
                        BirthDate = new DateTime(1999, 12, 12)
                    },
                    new Patient
                    {
                        FirstName = "Anna",
                        LastName = "Kowalczyk",
                        Login = "anna",
                        Password = "B",
                        IsActive = true,
                        BirthDate = new DateTime(1985, 5, 21)
                    },
                    new Patient
                    {
                        FirstName = "Piotr",
                        LastName = "Lewandowski",
                        Login = "piotr",
                        Password = "B",
                        BirthDate = new DateTime(1990, 8, 8)
                    }
                    ); ;
                var d1 = new Doctor
                {
                    Specialization = Specialization.Domowy,
                    FirstName = "Jan",
                    LastName = "Kowalski",
                    Login = "abc",
                    Password = "B",
                    IsAdmin = true
                };
                var d2 = new Doctor
                {
                    Specialization = Specialization.Laryngolog,
                    FirstName = "Anna",
                    LastName = "Nowak",
                    Login = "def",
                    Password = "C"
                };
                var d3 = new Doctor
                {
                    Specialization = Specialization.Dermatolog,
                    FirstName = "Marek",
                    LastName = "Wiśniewski",
                    Login = "ghi",
                    Password = "D"
                };
                var d4 = new Doctor
                {
                    Specialization = Specialization.Okulista,
                    FirstName = "Alicja",
                    LastName = "Kwiatkowska",
                    Login = "jkl",
                    Password = "E"
                };
                var d5 = new Doctor
                {
                    Specialization = Specialization.Neurolog,
                    FirstName = "Piotr",
                    LastName = "Dąbrowski",
                    Login = "mno",
                    Password = "F"
                };
                var d6 = new Doctor
                {
                    Specialization = Specialization.Ortopeda,
                    FirstName = "Ewa",
                    LastName = "Zielińska",
                    Login = "pqr",
                    Password = "G"
                };
                var d7 = new Doctor
                {
                    Specialization = Specialization.Pediatra,
                    FirstName = "Tomasz",
                    LastName = "Szymański",
                    Login = "stu",
                    Password = "H"
                };
                context.Doctor.AddRange(
                       d1,
                       d2,
                       d3,
                       d4,
                       d5,
                       d6,
                       d7
                    );
                context.SaveChanges();
            }
        }
    }
}