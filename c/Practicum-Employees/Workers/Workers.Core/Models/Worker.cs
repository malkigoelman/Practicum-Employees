namespace Workers
{
    public class Worker
    {
        string F_name;
        string L_name;
        int Tz;
        DateOnly StartDate;
        DateOnly BirthDay;
        bool Gender;
        bool Active;

        public Worker(string f_name, string l_name, int tz, DateOnly start_Date,bool active,bool gender)
        {
            F_name = f_name;
            L_name = l_name;
            Tz = tz;
            StartDate = start_Date;
            BirthDay = start_Date;
            Gender = gender;
            Active = active;
        }
    }
}
