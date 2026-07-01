"""
import re
regex=r'^[a-zA-Z0-9._]+@[a-zA_Z]+\.[a-z]{2,}$'
email=input("Email:")
if re.match(regex,email):
    print("Valid email")
else:
    print("Invalid email")"""

class Students:
    institute="OneTeam"
    def __init__(self,n,p):
        self.name=n
        self.place=p
        print(f"Hello {self.name}")

std1=Students("Liam","Kochi")  




















    

            

   