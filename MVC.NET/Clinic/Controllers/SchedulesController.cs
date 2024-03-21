using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Clinic.Data;
using Clinic.Models;

namespace Clinic.Controllers
{
    public class SchedulesController : Controller
    {
        private readonly ClinicContext _context;

        public SchedulesController(ClinicContext context)
        {
            _context = context;
        }

        // GET: Schedules
        public async Task<IActionResult> Index()
        {
            List<Doctor> doctors = new List<Doctor> { };
            foreach (var schedule in _context.Schedule) 
            {
                var doctor = await _context.Doctor.FirstOrDefaultAsync(m => m.Id == schedule.doctorId);
                doctors.Add(doctor);
            }
            var schedules = await _context.Schedule.ToListAsync();
            var model = new ScheduleViewModel(schedules, doctors);
            return _context.Schedule != null ? 
                        View(model) :
                        Problem("Entity set 'ClinicContext.Schedule'  is null.");
        }

        // GET: Schedules/Create
        public async Task<IActionResult> Create()
        {
            var model = new ScheduleCreateModel();
            model.DoctorsList = await _context.Doctor.ToListAsync();
            model.completeTimes(new DateTime(1, 1, 1, 8, 0, 0), new DateTime(1, 1, 1, 20, 0, 0), TimeSpan.FromMinutes(15));
            return View(model);
        }

        // POST: Schedules/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,doctorId,Day,Start,End")] Schedule schedule)
        {
            _context.Add(schedule);
            List <Appointment> appointments = new List<Appointment>();
            var start = schedule.Start;
            var end = schedule.End;
            while (start < end)
            {
                _context.Appointment.Add(new Appointment(schedule.doctorId, schedule.Day, start));
                start += TimeSpan.FromMinutes(15);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // GET: Schedules/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Schedule == null)
            {
                return NotFound();
            }

            var schedule = await _context.Schedule.FindAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }
            var model = new ScheduleCreateModel();
            model.DoctorsList = _context.Doctor.ToList();
            model.Schedule = schedule;
            model.completeTimes(new DateTime(1, 1, 1, 8, 0, 0), new DateTime(1, 1, 1, 20, 0, 0), TimeSpan.FromMinutes(15));
            return View(model);
        }

        // POST: Schedules/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int? id, [Bind("Id, doctorId,Day,Start,End")] Schedule schedule)
        {
            if (id != schedule.Id)
            {
                return NotFound();
            }

            try
            {
                _context.Update(schedule);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(schedule.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }

        // GET: Schedules/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Schedule == null)
            {
                return NotFound();
            }

            var schedule = await _context.Schedule
                .FirstOrDefaultAsync(m => m.Id == id);
            if (schedule == null)
            {
                return NotFound();
            }

            return View(schedule);
        }

        // POST: Schedules/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int? id)
        {
            if (_context.Schedule == null)
            {
                return Problem("Entity set 'ClinicContext.Schedule'  is null.");
            }
            var schedule = await _context.Schedule.FindAsync(id);
            if (schedule != null)
            {
                _context.Schedule.Remove(schedule);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        public async Task<IActionResult> AddLastWeek()
        {
            List<Doctor> doctors = new List<Doctor> { };
            foreach (var schedule in _context.Schedule)
            {
                var doctor = await _context.Doctor.FirstOrDefaultAsync(m => m.Id == schedule.doctorId);
                doctors.Add(doctor);
            }
           
            var lastWeekStart = DateTime.Now.AddDays(-(int)DateTime.Now.DayOfWeek); // first weekday = Sunday
            var lastWeekEnd = lastWeekStart.AddDays(6);

            var schedules = _context.Schedule
                .Where(entry => entry.Day >= lastWeekStart && entry.Day < lastWeekEnd)
                .ToList();

            foreach (var entry in schedules)
            {
                entry.Day = entry.Day.AddDays(7);
            }
            var model = new ScheduleViewModel(schedules, doctors);
            return View(model);
        }

        [HttpPost]
        [ActionName("AddLastWeek")]
        public async Task<IActionResult> AddLastWeekAction()
        {
            var lastWeekStart = DateTime.Now.AddDays(-(int)DateTime.Now.DayOfWeek);
            var lastWeekEnd = lastWeekStart.AddDays(6);
            var schedulesToAdd = _context.Schedule
                .Where(entry => entry.Day >= lastWeekStart && entry.Day < lastWeekEnd)
                .ToList();

            foreach (var entry in schedulesToAdd)
            {;
                entry.Day = entry.Day.AddDays(7);
                entry.Id = null;
                _context.Schedule.Add(entry);
            }
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ScheduleExists(int? id)
        {
          return (_context.Schedule?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
