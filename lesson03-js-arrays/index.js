"use strict"

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
// maria.print()
// ze.print()

console.log(maria.address)
console.log(maria["address"])

function printPropNames(obj) {
    let res = ""
    for (const key in obj) {
        res += key + ", "
    }
    console.log("Props = " + res)
}

printPropNames(maria) // Props = name, nr, print, address,
printPropNames(ze) // Props = name, nr, print,

const a = [1, "isel"]
console.log(a)
a[0] = "super"
console.log(a)
a[4] = 123
console.log(a)
console.log(a[2])
a.push("hello")
console.log(a)
