from abc import ABC,abstractmethod
print("-------- Student Rank List Management System --------")

#abstract class
class Grade(ABC):
    @abstractmethod
    def calculate_grade(self):
        pass

#base class
class Person:
    def __init__(self,name,age):
        self.__name=name
        self.__age=age

    def get_name(self):
        return self.__name
    
    def get_age(self):
        return self.__age

class Student(Person,Grade):
    student_count=0
    def __init__(self,name,age,roll_number,m1,m2,m3):
        super().__init__(name,age)
        self.roll_number=roll_number
        self.marks=[m1,m2,m3]

        Student.student_count+=1

    def total_marks(self):
        return sum(self.marks)
    
    def average(self):
        return self.total_marks()/3
    
    def calculate_grade(self):
        avg=self.average()
        if avg >= 90:
            return "A+"
        elif avg >= 80:
            return "A"
        elif avg >= 70:
            return "B"
        elif avg >= 60:
            return "C"
        elif avg >= 50:
            return "D"
        else:
            return "F"
        
    def display(self):
        print("Name         :", self.get_name())
        print("Age          :", self.get_age())
        print("Roll Number  :", self.roll_number)
        print("Marks        :", self.marks)
        print("Total marks  :", self.total_marks())
        print("Average marks:", round(self.average(), 2))
        print("Grade        :", self.calculate_grade())
    
    # Operator Overloading
    def __lt__(self,other):
        return self.total_marks()>other.total_marks()
    
    @staticmethod
    def validate_marks(mark):
        return 0<=mark<=100
    
    @classmethod
    def total_students(cls):
        print("\nTotal students created: ",cls.student_count)

class Sports:
    def __init__(self,sports_score):
        self.sports_score=sports_score

    def display_score(self):
        print("Sports score:",self.sports_score)

class Result(Student,Sports):
    def __init__(self,name,age,roll_number,m1,m2,m3,sports_score):
        Student.__init__(self,name,age,roll_number,m1,m2,m3)
        Sports.__init__(self,sports_score)
    
    def final_total(self):
        return self.total_marks()+self.sports_score
    
    #polymorphism(Method overrinding)
    def display(self):
        super().display()
        self.display_score()
        print("Final Total (Including Sports):", self.final_total())

students=[]  
n=int(input("\nEnter number of students: "))
for i in range(1,n+1):
    print(f"\nEnter details of student {i}")
    name=input("Name: ")
    age=int(input("Age: "))
    roll=int(input("Roll Number: "))

    while True:
        m1=int(input("Mark1: "))
        if Student.validate_marks(m1):
            break
        print("Invalid input! Value must be between 0 and 100")
    
    while True:
        m2=int(input("Mark2: "))
        if Student.validate_marks(m2):
            break
        print("Invalid input! Value must be between 0 and 100")

    while True:
        m3=int(input("Mark3: "))
        if Student.validate_marks(m3):
            break
        print("Invalid input! Value must be between 0 and 100")
    
    sport=int(input("Sports score: "))

    obj=Result(name,age,roll,m1,m2,m3,sport)
    students.append(obj)
   
students.sort()

print("\n---------- STUDENT DETAILS ----------")

for s in students:
    s.display()
    print("\n")

print("------------ RANK LIST ------------")

rank = 1
for s in students:
    print("\nRank :", rank)
    print("Name :", s.get_name())
    print("Roll :", s.roll_number)
    print("Total :", s.total_marks())
    print("Grade :", s.calculate_grade())
    rank += 1

Student.total_students()


