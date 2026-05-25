"""num=[2,5,3,7,4]
length=len(num)
for k in range(length):
    for j in range(0,length-k-1):
        if num[j]>num[j+1]:
            num[j],num[j+1]=num[j+1],num[j]
print(num)"""
num=[{'name':'as','total':242},{'name':'aw','total':234}]
n=len(num)
for i in range(n):
    for j in range(0,n-i-1):
        if num[j]['total']>num[j+1]['total']:
            num[j],num[j+1]=num[j+1],num[j]
print(num)
print('Class Topper is', num[0]['name'])
class_total=num[0]['total']+num[1]['total']
print(class_total)
class_avg=class_total/2
print('Class average: ',class_avg)