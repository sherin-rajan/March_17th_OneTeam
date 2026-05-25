s={"Ebin",3,12}
s.add("Kochi")
print(s)
s.remove(3)
print(s)
#s.remove(9) error
print(s)
s.discard(9)
print(s)
#.pop() : remove randomly
s.pop()
print(s)

#intersection : make a set with common elements of two sets
s={"Ebin",3,12}
y={12,"Ebin",4,5}
i=s.intersection(y)  #{"Ebin",12}
print(i)
#union : make a set of union of two set
u=s.union(y)   #{"Ebin",3,12,4,5}
print(u)
#.difference : make a set of element which is only in one not in other
d=s.difference(y)   #{3} only in s not in y
print(d)

a={"Ebin","OneTeam","Python"}
b={12,"Ebin","OneTeam","Python",14,5,4,3}
c={12,14,5,4,3}
print(a.issubset(b))  #True if subset
print(a.issuperset(b)) #True if superset