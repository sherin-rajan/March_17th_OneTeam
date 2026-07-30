//prime
/*n=8
if(n>1){
    let is_prime=true
    for(let i=2;i<n;i++){
        if(n%i==0){
            is_prime=false
            console.log("Not prime")
            break
        }
    }
    if(is_prime){
        console.log("Is prime")
    }
}*/


let k=2
let n=0
let primes=""
while(n<10)
if(k>1){
    let is_prime=true
    for(let i=2;i<k;i++){
        if(k%i==0){
            is_prime=false
            break
        }
    }
    if (is_prime){
        primes=primes+` ${k}`
        n++
    }
    k++
}
console.log(primes)