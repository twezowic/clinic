using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Clinic.Data;
using Clinic.Models;
using System.Collections;

namespace Clinic.Controllers
{
    public class DoctorsController : Controller
    {
        private readonly ClinicContext _context;

        public DoctorsController(ClinicContext context)
        {
            _context = context;
        }

        // GET: Doctors
        public async Task<IActionResult> Index(Specialization? doctorSpecialization)
        {
            string[] specializations = 
                Enum.GetNames(typeof(Specialization));

            var doctors = from m in _context.Doctor
                         select m;
            if (doctorSpecialization.HasValue)
            {
                doctors = doctors.Where(x => x.Specialization == doctorSpecialization.Value);
            }
            var doctorSpecialzationVM = new DoctorSpecializationViewModel
            {
                Specializations = new SelectList(specializations),
                Doctors = await doctors.ToListAsync(),
                DoctorSpecialization = null
            };

            return View(doctorSpecialzationVM);
        }

        // GET: Doctors/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Doctor == null)
            {
                return NotFound();
            }

            var doctor = await _context.Doctor
                .FirstOrDefaultAsync(m => m.Id == id);
            if (doctor == null)
            {
                return NotFound();
            }

            return View(doctor);
        }

        // GET: Doctors/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Doctors/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Specialization,IsAdmin,Id,Login,Password,FirstName,LastName,IsActive")] Doctor doctor)
        {
            if (ModelState.IsValid)
            {
                _context.Add(doctor);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(doctor);
        }

        public IActionResult Report(DateTime start, DateTime end)
        {
            List<DoctorReport> reports = new List<DoctorReport>();
            var doctors = _context.Doctor.ToList();
            foreach(var doctor in doctors)
            {
                var doctorSchedule = _context.Schedule.Where(s => s.doctorId == doctor.Id && s.Day >= start && s.Day <= end).ToList();
                var scheduleTime = TimeSpan.Zero;
                foreach (var daySchedule in doctorSchedule)
                {
                    TimeSpan workTime = daySchedule.End - daySchedule.Start;
                    scheduleTime += workTime;
                }
                var appointmentTime = _context.Appointment.Where(s=>s.DoctorId == doctor.Id && s.Date >= start && s.Date <= end).ToList().Count * TimeSpan.FromMinutes(15);
                reports.Add(new DoctorReport(doctor, scheduleTime, appointmentTime));
            }
            return View(reports);
        }

        public IActionResult Report2(DateTime start, DateTime end)
        {
            List<DoctorReport> reports = new List<DoctorReport>();
            var doctors = _context.Doctor.ToList();
            foreach (var doctor in doctors)
            {
                var doctorSchedule = _context.Schedule.Where(s => s.doctorId == doctor.Id && s.Day >= start && s.Day <= end).ToList();
                var scheduleTime = TimeSpan.Zero;
                foreach (var daySchedule in doctorSchedule)
                {
                    TimeSpan workTime = daySchedule.End - daySchedule.Start;
                    scheduleTime += workTime;
                }
                var appointmentTime = _context.Appointment.Where(s => s.DoctorId == doctor.Id && s.Date >= start && s.Date <= end).ToList().Count * TimeSpan.FromMinutes(15);
                reports.Add(new DoctorReport(doctor, scheduleTime, appointmentTime));
            }
            List<string> listOfInfo = reports.Select(item => item.Info()).ToList();
            List<int> WorkingIntervals = reports.Select(item => (int)item.WorkingHour.TotalMinutes / 15 ).ToList();
            List<int> AppointmentsTimes = reports.Select(item => (int)item.AppointmentHour.TotalMinutes / 15 ).ToList();

            var chartData = new
            {
                labels = listOfInfo,
                data1 = WorkingIntervals,
                data2 = AppointmentsTimes
            };
            return View(chartData);
        }

        private bool DoctorExists(int id)
        {
          return (_context.Doctor?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
