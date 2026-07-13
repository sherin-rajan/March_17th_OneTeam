import re

def validate_username(username):
    pattern = r"^[a-zA-Z][a-zA-Z0-9_]{3,10}$"
    if re.fullmatch(pattern,username):
        return True
    else:
        return False
    
def validate_password(password):
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+*&^%$#@!]).{8,}$"
    if re.fullmatch(pattern,password):
        return True
    else:
        return False

def validate_name(name):
    pattern = r"^[A-Za-z ]{2,15}$"
    if re.fullmatch(pattern,name):
        return True
    else:
        return False
    
def validate_email(email):
    pattern = r"^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-z]{2,}$"
    if re.fullmatch(pattern,email):
        return True
    else:
        return False

def validate_number(number):
    pattern = r"^(\+91[- ]?)?[6-9]\d{9}$"
    if re.fullmatch(pattern,number):
        return True
    else:
        return False