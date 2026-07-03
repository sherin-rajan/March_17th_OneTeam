def students(**kwargs):
    print(kwargs)

students(name="Liam", age=2, location="Kochi")

def reverse_string(s):
     if len(s)==0:
          return s
     else:
          return reverse_string(s[1:])+s[0]
     
print(reverse_string("abcdefghijklmnop"))

def employee(name,depart="IT",*skill,**details):
    print("Name: ",name)
    print("Department: ",depart)
    print("Skills:")
    for s in skill:
        print(s)
    print("Details:")
    for k,v in details.items():
        print(k,":",v)

employee("Anu","IT","Coding","Writing","Dancing",Age=25,Place="Kochi")
