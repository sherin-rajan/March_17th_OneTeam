#adition w/o sum or loop
"""
n=10
s=(n*(n+1))/2
print(s)"""

"""def add(n):
    if n==1:
        return 1
    return n+add(n-1)
    
print(add(10))"""

import re
regex=r'^[a-zA-Z0-9._]+@[a-zA_Z]+\.[a-z]{2,}$'
email=input("Email:")
if re.match(regex,email):
    print("Valid email")
else:
    print("Invalid email")








    

            

   