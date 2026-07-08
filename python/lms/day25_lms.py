from abc import ABC,abstractmethod
print("Student Rank List Management System")

class Grade(ABC):
    @abstractmethod
    def calculate_grade():
        pass

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
    def __init(self,name,age,roll_number,m1,m2,m3):
        super().__init__(name,age)
        self.roll_number-roll_number
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
    def display_details(self):
        print("Name      :", self.get_name())
        print("Age       :", self.get_age())
        print("Roll No   :", self.roll_number)
        print("Marks     :", self.marks)
        print("Total     :", self.total_marks())
        print("Average   :", round(self.average(), 2))
        print("Grade     :", self.calculate_grade())

class Sports:
    def __init__(self,sports_score):
        self.sports_score=sports_score
    def display_score(self):
        return self.sports_score

class Result(Student,Sports):
    


