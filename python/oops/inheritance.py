#inheriting features from parent class to child class
#single inheritance: one parent one child
class Employee:
    def __init__(self):
        self.name="Ebin"
        self.designation="Developer"
    def work(self):
        print("Method work from Employee class")
class Developer(Employee):
    def __init__(self):    #__init__ works for the object class,
        Employee.__init__(self)  #so we need to connect to __init__ of parent also to access name
        self.language="Python"
    def work(self):
        print(f"{self.name} developing new software")
        
emp=Developer()
emp.work()

class Employee:
    def __init__(self,name,designation):
        self.name=name
        self.designation=designation
    def work(self):
        print("Method work from Employee class")
class Developer(Employee):
    def __init__(self,name,designation,language):
        Employee.__init__(self,name,designation)    
        #super().__init__(name,designation)  #super() is also used to connect to parent
        self.language=language
    def work(self):
        print(f"{self.name} developing new software in {self.language}")

emp=Developer("Ebin","Developer","Python")
emp.work()

#multiple inheritance
class Father:
    def __init__(self,skill):
        self.skill=skill
class Mother:
    def __init__(self,talent):
        self.talent=talent
class Son(Father,Mother):
    def __init__(self,name,skill,talent,likes):
        Father.__init__(self,skill)
        Mother.__init__(self,talent)
        self.name=name
        self.skills=likes
    def data(self):
        print(f"{self.name} is like {self.likes} and his fathar likes {self.skill} and his mother likes {self.talent}")

son1=Son("Ebin","Driving","Cooking","Coding")
son1.data()

#multilevel inheritance:grandparent->parent->child
class Employee:
    def __init__(self,cname):
        self.cname=cname
class Language(Employee):
    def __init__(self,cname,lang):
        super().__init__(cname)
        self.lang=lang
class Developer(Language):
    def __init__(self,name,lang,cname):
        super().__init__(cname,lang)
        self.name=name
    def show(self):
        print(self.name,"is a",self.lang, "developer working in",self.cname )

emp1=Developer("Ebin","Python","OneTeam")
emp1.show()