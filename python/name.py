"""
name="Liam"
age=1
place="Pathanamthitta"
print("My name is Liam and I am 1 years old")
print("My name is",name,"and I am ",age,"years old")
print(f"My name is {name} and I am {age} years old. I am from {place}")"""

"""string="abracadabra"
l=list(string)
print(l)
l[5]='k'
string=''.join(l)
print(string)"""


def mutate_string(string,position,character):
    l=list(string)
    l[position]=character
    string=''.join(l)
    return string

print(mutate_string("abracadabra",5,'k'))


