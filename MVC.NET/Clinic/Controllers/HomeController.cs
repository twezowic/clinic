using Clinic.Data;
using Clinic.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Numerics;
using static Clinic.Global;

namespace Clinic.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ClinicContext _context;

        public HomeController(ILogger<HomeController> logger, ClinicContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Login() 
        {   
            return View();
        }

        [HttpPost]
        public ActionResult Login(string login, string password)
        {
            var doctor = _context.Doctor.SingleOrDefault(u => u.Login == login && u.Password == password);

            if (doctor != null)
            {
                Global.Usertype = UserType.Doctors;
                Global.UserId = doctor.Id;
                Global.IsActive = true;
                if (doctor.IsAdmin)
                {
                    Global.IsAdmin = true;
                }
                return RedirectToAction("Details", "Doctors", new { id = doctor.Id });
            }

            var patient = _context.Patient.SingleOrDefault(u => u.Login == login && u.Password == password);

            if (patient != null)
            {
                Global.Usertype = UserType.Patients;
                Global.UserId = patient.Id;
                Global.IsActive = patient.IsActive;
                return RedirectToAction("Details", "Patients", new { id = patient.Id });
            }
            ModelState.AddModelError(string.Empty, "Invalid login or password");
            return View();
        }

        public IActionResult Logout()
        {
            Global.reset();
            return RedirectToAction("Index", "Home");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}