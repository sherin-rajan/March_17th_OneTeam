"""def MyDec(fun):
    def wrapper():
        print("Hello from decorator")
        fun()
    return wrapper
@MyDec
def Greet():
    print("Hello Everyone")

Greet()"""

def divideDec(fun):
    def wrapper(a,b):
        if a>b:
            fun(a,b)
        else:
            print("Function can not be called since a is smaller than b")
    return wrapper

@divideDec
def divide(a,b):
    print(a/b)

divide(4,2)