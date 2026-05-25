#fibonacci series: adding two preceeding numbers to get next number

first,second=0,1
print(first,second,end=" ")
for n in range(8):
    third=first+second
    print(third,end=" ")
    first,second=second,third
    