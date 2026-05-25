#prime number or not
n=int(input('Enter your number : '))
if n>1:
    for k in range(2,int(n*.5)+1):
        if n%k==0:
            print(n,"is not a prime number")
            break
    else:
        print(n,'is a prime number')
else:
    print(n,"is not a prime number")


#prime number or not
n=int(input('Enter your number : '))
is_prime=True
if n>1:
    for k in range(2,int(n*.5)+1):
        if n%k==0:
            print(n,"is not a prime number")
            is_prime=False
            break
    if is_prime:
        print(n,'is a prime number')
else:
    print(n,"is not a prime number")

#prime number or not from list
n=[2,4,16,17,29,19,11]
for i in n:
    is_prime=True
    if i>1:
        for k in range(2,int(i*.5)+1):
            if i%k==0:
                is_prime=False
                print(i,"is not a prime number")
                break
        if is_prime:
            print(i,'is a prime number')
    else:
        print(i,"is not a prime number")