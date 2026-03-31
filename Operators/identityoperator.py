"""
l1=[12,13,14]
l2=[12,13,14]
print(id(l1))
print(id(l2))
print(l1 is l2)

l1=[12,13,14]
l2=[12,13,14]
l1=l2
print(id(l1))
print(id(l2))
print(l1 is l2)
"""
list1=['sherin','pta',27]
list2=['sherin','pta',27]
print(id(list1))
print(id(list2))
print(list1 is not list2)
print(list1 is list2)

tuple1=('sherin','pta',27)
tuple2=('sherin','pta',27)
print(id(tuple1))
print(id(tuple2))
print(tuple1 is tuple2)