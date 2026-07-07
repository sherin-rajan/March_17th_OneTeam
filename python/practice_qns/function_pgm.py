"""def name of function():     block of code executed when it is called
    set of code"""

def greet(name,place):
    print(f"Hello {name} from {place}, Welcom to OneTeam")        

#greet("Ebin","Kochi")          function only worked when it is called, here it is as comment

def greet(name="Guest",place="India"):
    print(f"Hello {name} from {place}, Welcom to OneTeam")

#greet()  default args:fall back to default value when called without any args



# *args used for passing multiple values to a function
# **kwargs(keyword argument) used for passing multiple key-value 

# normal:
def total(a,b):
    return a+b

# print(total(10,20))
     
# using *args
def total(*numbers):
        s=0
        for k in numbers:
            s+=k   
        print(s)

#total(22,11,33,44)

"""recursion: fuction call itself 
there is a base code for stop it and a recursion code to call itself"""


#example:factorial
def fact(num):
    if num==1:
        return num
    else:
        return num*fact(num-1)

#print(fact(5))


#lambda arguments:expression
#result=lambda a,b:a+b
#print(result(10,12))
"""result=lambda a,b,c:a+b-c
print("result=",result(12,19,10))

n=5
for i in range(1,n+1):
    num=i
    step=n-1
    for j in range(1,i+1):
        print(num,end=" ")
        num=num+step
        step-=1
    print("")"""


def reverse_string(s):
     if len(s)==0:
          return s
     else:
          return reverse_string(s[1:])+s[0]
    
# print(reverse_string("olleh"))
