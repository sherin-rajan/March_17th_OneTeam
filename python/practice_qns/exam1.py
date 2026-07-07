"""
#prime from list
l=[2,34,7,19,11,1,36,29]
for i in l:
    if i>1:
        is_prime=True
        for j in range(2,int(i/2)+1):
            if i%j==0:
                print(i,"is not prime")
                is_prime=False
                break
        if is_prime:
                print(i,"is prime")     
    else:
        print(i,"is not prime")"""

#product with stock, filter second largest stock
"""stock={"a":23,"b":12,"c":24,"d":14}
values=list(stock.values())
values=sorted(values)
second=values[-2]
for k,v in stock.items():
    if v==second:
        print("Second largest:",k,'=',v)
#without built-in
products={"Laptop":23,"Mobile Phone":12,"Watch":24,"Headset":14}
largest=0
second=0
largest_product=""
second_largest=""
for key in products:
    stock=products[key]
    if stock>largest:
        second=largest
        largest=stock
        largest_product=key
        second_largest=largest_product
    elif stock>second and stock!=largest:
        second=stock
        second_largest=key
print(f"Second largest product with stock:{second_largest}({second})")"""
    
#take a string and find how many words ends with vowels
"""
st="Are we going for a movie"
l=st.split()
print(l)
count=0
for i in l:
    if i[-1] in "AEIOUaeiou":
        count+=1
print(count)
#without split
st="Are we going for a movie"
word=""
count=0
for i in st:
    if i!=" ":
        word+=i
    else:
        last=word[-1]
        if last in "AEIOUaeiou":
            count+=1
if st[-1] in "AEIOUaeiou":
        count+=1
print(count)"""

#sum of n numbers with recursion
"""
n=int(input("Enter any number:"))
def sum(n):
    if n==1:
        return 1
    else:
        return n+sum(n-1)
     
print(sum(n))"""

"""
1
2 7
3 8 12
4 9 13 16
5 10 14 17 19
6 11 15 18 20 21"""

for i in range(1,7):
    m=6
    n=i
    for j in range(1,i+1):
        print(n,end=" ")
        m-=1
        n+=m
    print()



    




