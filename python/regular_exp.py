import re
"""s="Python : Easy to learn"
match=re.search(r"A",s)
print(match)
print("Start index:",match.start())
print("End index:",match.end())

t="I am ABC and my phone number is 1234567890 and am work from 9 to 10"
pattern="\d"    #filter all digits separately
n_pattern="\d+" #filter each sets of digits together
match=re.findall(pattern,t)
n_match=re.findall(n_pattern,t)
print(match)
print(n_match)

#validating email
regex=r'^[a-zA-Z0-9._]+@[a-zA_Z]+\.[a-z]{2,}$'
email=input("Email:")
if re.match(regex,email):
    print("Valid email")
else:
    print("Invalid email")

#phone number validation

pattern2=r'^[6-9][0-9]{9,}$'
phone=input("Enter phone number:")
if re.match(pattern2,phone):
    print("Valid Phone Number")
else:
    print("Invalid Phone Number")"""

#indian phone number validation
"""pattern3=r'^(\+91[- ]?)?[6-9]\d{9}$'   #?:for optional
phone_number=input("Enter the number:")
if re.match(pattern3,phone_number):
    print("Indian Phone Number")
else:
    print("This is not indian")"""

#password validation
#Minimum 8 characters
#At least 1 uppercase letter
#At least 1 lowercase letter
#At least 1 digit
#At least 1 special character
pattern4=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+*&^%$#@!]).{8,}$'
password=input("Enter the password:")
if re.match(pattern4,password):
    print("Valid password")
else:
    print("Invalid password")