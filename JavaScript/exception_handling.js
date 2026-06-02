let a=10
let b="20"
console.log(a+b)

let c=0
console.log(a/c)

try {
    let a = 10;
    let b = 0;

    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    let result = a / b;
    console.log(result);
} catch (error) {
    console.log(error.message);
}

try {
    console.log(userName);
} catch (error) {
    console.log(error.message);
}