using Clinic.Models;
using Microsoft.EntityFrameworkCore;
using ReactClinic.Data;

namespace ReactClinic.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ReactClinicContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ReactClinicContext>>()))
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
                    Specialization = "Domowy",
                    FirstName = "Jan",
                    LastName = "Kowalski",
                    Login = "abc",
                    Password = "B",
                    IsAdmin = true
                };
                var d2 = new Doctor
                {
                    Specialization = "Laryngolog",
                    FirstName = "Anna",
                    LastName = "Nowak",
                    Login = "def",
                    Password = "C"
                };
                var d3 = new Doctor
                {
                    Specialization = "Dermatolog",
                    FirstName = "Marek",
                    LastName = "Wiśniewski",
                    Login = "ghi",
                    Password = "D"
                };
                var d4 = new Doctor
                {
                    Specialization = "Okulista",
                    FirstName = "Alicja",
                    LastName = "Kwiatkowska",
                    Login = "jkl",
                    Password = "E"
                };
                var d5 = new Doctor
                {
                    Specialization = "Neurolog",
                    FirstName = "Piotr",
                    LastName = "Dąbrowski",
                    Login = "mno",
                    Password = "F"
                };
                var d6 = new Doctor
                {
                    Specialization = "Ortopeda",
                    FirstName = "Ewa",
                    LastName = "Zielińska",
                    Login = "pqr",
                    Password = "G"
                };
                var d7 = new Doctor
                {
                    Specialization = "Pediatra",
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

                context.Schedule.AddRange(
                    new Schedule
                    {
                        doctorId = 1,
                        Day = new DateTime(1999, 12, 12),
                        Start = new DateTime(2000,11, 12,8,0,0),
                        End = new DateTime(2000, 11, 12, 12, 0, 0),
                    }
                    ); ;

                context.SaveChanges();
            }
        }
    }
}
