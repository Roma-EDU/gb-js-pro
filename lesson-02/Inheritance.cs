using System;

namespace Inheritance 
{
    public class Person
    {
        private readonly string _name;

        public Person(string name)
        {
            _name = name;
        }

        protected virtual string getIntroduceMessage()
        {
            return $"Меня зовут {_name}.";
        }

        public void Greating()
        {
            Console.WriteLine("Привет! " + getIntroduceMessage());
        }
    }

    public class Teacher : Person
    {
        private readonly string _subject;

        public Teacher(string name, string subject)
            : base(name)
        {
            _subject = subject;
        }

        protected override string getIntroduceMessage()
        {
            return $"{base.getIntroduceMessage()} {_subject} мой любимый предмет.";
        }
    }
    
    public static class Program 
    {
        public static void Main(string[] args)
        {
            Person person1 = new Person("Василий");
            Person person2 = new Teacher("Иван Петрович", "Физика");
            
            person1.Greating(); //Привет! Меня зовут Василий.
            person2.Greating(); //Привет! Меня зовут Иван Петрович. Физика мой любимый предмет.

            Console.ReadKey();
        }
    }

}