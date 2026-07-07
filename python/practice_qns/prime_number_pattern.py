# first 10 prime numbers
count=0
n=2
while True:
    if n>1:
        is_prime=True
        for i in range(2,int(n*.5)+1):
            if n%i==0:
                is_prime=False
                break
        if is_prime:
            print(n,end=" ")
            count+=1
    n+=1
    if count==10:
        break


# 2
# 3 5
# 7 11 13
# 17 19 23 29
n=2
for i in range(1,6):
    for j in range(1,i+1):
        while True:
            if n>1:
                is_prime=True
                for k in range(2,int(n*.5)+1):
                    if n%k==0:
                        is_prime=False
                        n+=1
                        break
                if is_prime:
                    print(n,end=" ")
                    n+=1
                    break

    print()