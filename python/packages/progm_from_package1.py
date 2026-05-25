#access package then import module then run the functions
from my_package import mod1,mod2 
print(mod1.add(12,6))
print(mod2.is_Even(56))

#directly import the fuctions
from my_package.mod2 import square,is_Even
print(square(4))
print(is_Even(45))