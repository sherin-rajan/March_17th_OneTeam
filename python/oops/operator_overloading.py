class Additions:
    def __init__(self,a):
        self.a=a

    def __add__(self,nxt):       #defining '+' operator
        return self.a+nxt.a
    
ob1=Additions(2)
ob2=Additions(4)
ob3=Additions("One")
ob4=Additions("Team")

print(ob1+ob2)  
print(ob3+ob4)
#it will works as below internally
#print(Additions.__add__(ob1,ob2))
#print(ob1.__add__(ob2))
    