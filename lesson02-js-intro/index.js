"use strict"

console.log("Ola ISEL")

let n = 11
console.log(n)
n="isel"
console.log(n)

// NOT Valid in use strict mode
// str = "ola"

function print() {
    let str = "123"
    console.log(str)
}


function createStudent(name, nr) {
    return {
        name: name,
        nr: nr,
        print: function(){console.log(this)}
    } 
}

const maria = createStudent("Maria", 72739)
const ze = createStudent("Jose", 8798357)

maria.address = "Lisbon"

maria.print()
ze.print()