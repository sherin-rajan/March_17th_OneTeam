#numbers=list(map(int, input().split())) : user give like 10 20 30 40
#numbers=[int(input()) for _ in range(n)] : user give each as separate entry
"""n = int(input())
arr = list(map(int, input().split()))
arr=list(set(arr))
arr.sort()
print(arr[-2])"""

n=int(input())
l=[]
for _ in range(n):
    command=input().split()
    if command[0]=='insert':
        l.insert(int(command[1]),int(command[2]))
    elif command=='print':
        print(l)
    elif command=='remove':
        l.remove(int(command[1]))
    elif command=='append':
        l.append(int(command[1]))
    elif command=='pop':
        l.pop(int(command[1],int(command[2])))
    elif command=='sort':
        l.sort()
    elif command=='reverse':
        l.reverse()

