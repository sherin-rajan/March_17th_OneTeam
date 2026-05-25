""" multiplication table
size=int(input("Enter any number : "))
product=1
for i in range(1,11):
    product=i*size
    print(f'{i}*{size}={product}')
"""

size=int(input("Enter any number : "))
for i in range(1,11):
    print(f"{i}x{size}={i*size}")
