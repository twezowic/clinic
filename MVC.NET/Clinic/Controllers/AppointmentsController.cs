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
using Microsoft.AspNetCore.Routing;
using System.Data;

namespace Clinic.Controllers
{
    public class AppointmentsController : Controller
    {
        private readonly ClinicContext _context;

        public AppointmentsController(ClinicContext context)
        {
            _context = context;
        }

        // GET: Appointments
        public async Task<IActionResult> Index()
        {
            var appointments = from m in _context.Appointment
                               select m;
            appointments = appointments.Where(x => x.PatientId != null);
            if (Global.Usertype == Global.UserType.Patients)
            {
                appointments = appointments.Where(x => x.PatientId == Global.UserId);
            }
            else if (Global.IsAdmin == false)
            {
                appointments = appointments.Where(x => x.DoctorId == Global.UserId);
            }
            List<AppointmentFilled> filledappointments = new List<AppointmentFilled>();
            foreach (var appointment in appointments.ToList())
            {
                var doctorInfo = _context.Doctor.First(x=>x.Id == appointment.DoctorId).Info();
                var patientInfo = _context.Patient.First(x => x.Id == appointment.PatientId).Info();
                filledappointments.Add(new AppointmentFilled(appointment,doctorInfo, patientInfo));
            }
            filledappointments = filledappointments.OrderBy(x => x.Date).ThenBy(x => x.Start).ToList();
            return appointments != null ? 
                          View(filledappointments) :
                          Problem("Entity set 'ClinicContext.Appointment'  is null.");
        }

        // GET: Appointments/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Appointment == null)
            {
                return NotFound();
            }

            var appointment = await _context.Appointment
                .FirstOrDefaultAsync(m => m.Id == id);
            if (appointment == null)
            {
                return NotFound();
            }
            var doctorInfo = _context.Doctor.First(x => x.Id == appointment.DoctorId).Info();
            var patientInfo = _context.Patient.First(x => x.Id == appointment.PatientId).Info();
            var filledappointment = new AppointmentFilled(appointment, doctorInfo, patientInfo);

            return View(filledappointment);
        }
        private bool AreAppointmentsEqual(Appointment appointment1, Appointment appointment2)
        {
            return appointment1.DoctorId == appointment2.DoctorId
                && appointment1.Date == appointment2.Date
                && appointment1.Start == appointment2.Start;
        }

        // GET: Appointments/Create
        public async Task<IActionResult> Create(Specialization? doctorSpecialization)
        {
            //wybieranie specjalizacji
            string[] specializations = Enum.GetNames(typeof(Specialization));
            var doctors = from m in _context.Doctor
                          select m;
            if (doctorSpecialization.HasValue)
            {
                doctors = doctors.Where(x => x.Specialization == doctorSpecialization.Value);
            }

            //generowanie terminów wizyt
            var appointments = from m in _context.Appointment select m;
            appointments = appointments.Where(x => x.Date > DateTime.Today && doctors.Select(d => d.Id).Contains(x.DoctorId) && x.PatientId == null);
            //sortowanie
            appointments = appointments.OrderBy(x => x.Date).ThenBy(x => x.Start);

            var model = new AppointmentCreateViewModel
            {
                Specializations = new SelectList(specializations),
                DoctorsList = await doctors.ToListAsync(),
                AppointmentsList = appointments.ToList(),
                DoctorSpecialization = null
            };
            return View(model);
        }

        // POST: Appointments/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,DoctorId,Date,Start,RowVersion")] Appointment appointment)
        {
            try 
            { 
                appointment.PatientId = Global.UserId;
                _context.Update(appointment);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch (DbUpdateConcurrencyException ex)
            {
                var entry = ex.Entries.Single();
                var clientValues = (Appointment)entry.Entity;
                var databaseEntry = entry.GetDatabaseValues();

                if (databaseEntry == null)
                {
                    ModelState.AddModelError(string.Empty, "Wizyta została usunięta przez administratora.");
                }
                else
                {
                    var databaseValues = (Appointment)databaseEntry.ToObject();
                    if (databaseValues.PatientId != clientValues.PatientId)
                        ModelState.AddModelError(string.Empty, "Wizyta jest już zajęta.");
                    if (databaseValues.PatientId == clientValues.PatientId)
                        ModelState.AddModelError(string.Empty, "Już dodałeś tą wizytę.");
                    else
                        ModelState.AddModelError(string.Empty, "Rekord został zmodyfikowany. Konflikt wartości.");
                }
            }

            //generowanie terminów wizyt
            var appointments = from m in _context.Appointment select m;
            appointments = appointments.Where(x => x.Date > DateTime.Today && x.PatientId == null);
            //sortowanie
            appointments = appointments.OrderBy(x => x.Date).ThenBy(x => x.Start);

            var model = new AppointmentCreateViewModel
            {
                Specializations = new SelectList(Enum.GetNames(typeof(Specialization))),
                DoctorsList = await _context.Doctor.ToListAsync(),
                AppointmentsList = appointments.ToList(),
                DoctorSpecialization = null
            };
            return View(model);
        }

        // Odpowiedni widok
        //@if(Global.IsAdmin || @item.DoctorId == Global.UserId)
        //{
        //             < td >
        //                < a asp - action = "Delete" asp - route - id = "@item.Id" class="btn btn-danger">Delete</a>
        //            </td>
        //}

    // GET: Appointments/Edit/5
    public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Appointment == null)
            {
                return NotFound();
            }

            var appointment = await _context.Appointment.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }
            return View(appointment);
        }

        // POST: Appointments/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,PatientId,DoctorId,Date,Start,Comment")] Appointment appointment)
        {
            if (id != appointment.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(appointment);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AppointmentExists(appointment.Id))
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
            return View(appointment);
        }

        public async Task<IActionResult> Cancel(int? id)
        {
            if (id == null || _context.Appointment == null)
            {
                return NotFound();
            }

            var appointment = await _context.Appointment
                .FirstOrDefaultAsync(m => m.Id == id);
            if (appointment == null)
            {
                return NotFound();
            }

            return View(appointment);
        }

        [HttpPost, ActionName("Cancel")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CancelConfiremd(int id)
        {
            if (_context.Appointment == null)
            {
                return Problem("Entity set 'ClinicContext.Appointment'  is null.");
            }
            var appointment = await _context.Appointment.FindAsync(id);
            if (appointment != null)
            {
                appointment.PatientId = null;
                _context.Appointment.Update(appointment);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // GET: Appointments/Delete/5
        public async Task<IActionResult> Delete(int? id, bool? concurrencyError)
        {
            if (id == null || _context.Appointment == null)
            {
                return NotFound();
            }

            var appointment = await _context.Appointment
                .FirstOrDefaultAsync(m => m.Id == id);
            if (appointment == null)
            {
                if (concurrencyError.GetValueOrDefault())
                {
                    return RedirectToAction("Index");
                }
                return NotFound();
            }

            if (concurrencyError.GetValueOrDefault())
            {
                ViewBag.ConcurrencyErrorMessage = "Wizyta została już zarezerwowana przez pacjenta. Jeżeli dalej chcesz usunąć naciśnij delete";
            }

            return View(appointment);
        }

        // POST: Appointments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Appointment appointment)
        {
            try
            {
                _context.Entry(appointment).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            catch (DbUpdateConcurrencyException)
            {
                return RedirectToAction("Delete", new { concurrencyError = true, id = appointment.Id });
            }
            catch (DataException)
            {
                ModelState.AddModelError(string.Empty, "Unable to delete. Try again, and if the problem persists contact your system administrator.");
                return View(appointment);
            }
        }

        private bool AppointmentExists(int id)
        {
          return (_context.Appointment?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
