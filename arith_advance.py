list=[12, 13, 14]
list=list+[15, 16]
print(list)

t=(12,)
t=t+('kochi',23)  #new tuple is formed by removing the odd
print(t)
k=t+('kochi','python')
print(k)

set={'a', 'b', 'c',} # set can not be added using +
set=set+{'d', 'e'}
print(set)