#dictionary methods

#.clear()
d={"name":"Ebin","age":30,"place":"Kochi"}
print(d.clear())

#.fromkeys() : create dictionary from given sequence
k=("name","age",5)
d=dict.fromkeys(k)
print(d)

#.get() : taking values if no key shows none
d={"name":"Ebin","age":30,"place":"Kochi"}
print(d.get("place"))
print(d.get("area"))     #none bcoz there is no key
print(d.get("area","unkown"))   #shows unkown instead of none

#.getdefault() : taking values, if key is not there we can set default values
d={"name":"Ebin","age":30,"place":"Kochi"}
print(d.setdefault("place"))
print(d.setdefault("area"))


"""#.items() : return key-value as list of tuples
d={"name":"Ebin","age":30,"place":"Kochi"}
print(d.items())
print(d.keys())
print(d.values())

#.pop() : remove given key:value
d={"name":"Ebin","age":30,"place":"Kochi"}
print(d.pop("age"))
print(d)

#.popitem() : remove last key:value
d={"name":"Ebin","age":30,"place":"Kochi"}
print(d.popitem())
print(d)

#.update : add new key:value or modify
d={"name":"Ebin","age":30,"place":"Kochi"}
d.update({"name":"Arun","age":28,})
print(d)
d={"name":"Ebin","age":30,"place":"Kochi"}
s={"name":"Athul",5:"A"}
d.update(s)
print(d)
"""

