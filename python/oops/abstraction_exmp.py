from abc import ABC,abstractmethod
class Greet(ABC):  #abstract class
    @abstractmethod
    def say_hello(self):
        pass      #it is incomplete, it force child class to define the function

class English(Greet):
    def say_hello(self):
        print("Hello")


g=English()
g.say_hello()
    