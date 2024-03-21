namespace Clinic
{
    public static class Global
    {
        public enum UserType
        { 
            Patients,
            Doctors
        }

        public static UserType? Usertype { get; set; } = UserType.Patients;
        public static Boolean IsAdmin { get; set; } = false;
        public static Boolean IsActive { get; set; } = false;
        public static int UserId { get; set; } = 0;
        public static void reset()
        {
            UserId = 0;
            Usertype = null;
            IsAdmin = false;
            IsActive = false;
        }
    }
}
