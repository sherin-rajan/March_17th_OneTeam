"""
matrix=[[1,2,3],[4,5,6]]
[[1,4],[2,5],[3,6]]

matrix=[[1,2,3],[4,5,6]]
o=[]
for i in range(len(matrix)+1):
    p=[]
    for j in matrix:
        p+=[j[i]]
    o+=[p]
print(o)"""

stock = [
    {'name': 'laptop', 'stock': 23},
    {'name': 'mouse', 'stock': 12},
    {'name': 'keyboard', 'stock': 20}
]
n = len(stock)
for i in range(n):
    for j in range(n - i - 1):
        if stock[j]['stock'] > stock[j + 1]['stock']:
            stock[j],stock[j+1]=stock[j + 1],stock[j]
print(stock)



    
    





    
        
        



    

        
