class Person:
    def __init__(self,name,age):
        self._name=name
        self.__age=age

    @property
    def name(self):
        return self._name
    
    @property
    def age(self):
        return self.__age
    
    @age.setter
    def age(self,value):
        self.__age=value

person1=Person("Arun",27)
print(person1.age)
person1.age=30
print(person1.age)

#@setter can be used for validation to avoid invalid updation

class Student:
    def __init__(self, age):
        self.age = age      # Calls the setter

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self.__age = value

s1=Student(20)
print(s1.age)
s1.age = 25
print(s1.age)
#s1.age=-5
#print(s1.age)   it will throw an error 