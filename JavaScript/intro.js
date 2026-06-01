let name="Ebin"
let age=27
console.log(`Hello ${name}, You are ${age} years old`)

let a=10
let b=20

let choice=3

if(choice==1){
    console.log(a+b)
}
else if(choice==2){
    console.log(a*b)
}
else if(choice==3){
    console.log(b-a)
}
else{
    console.log("Invalid Input")
}

for(let i=1;i<=10;i++){
    console.log(i)
}

//factorial
let r=1
for(let i=1;i<=5;i++){
    r=r*i
}
console.log(r)

//fibonacii
let f=0
let s=1
console.log(f)
console.log(s)
for(i=2;i<=8;i++){
    let t=f+s
    console.log(t)
    f=s
    s=t
}

let first=0
let second=1
console.log(f)
console.log(s)
let count=0
while(count<8){
    let third=first+second
    console.log(third)
    first=second
    second=third
    count++
}



