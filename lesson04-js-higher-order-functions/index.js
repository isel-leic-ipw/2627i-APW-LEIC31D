function dummy() {return 11}

function bar(f) {
    console.log(f)
}

const zas = function() { }
const doe = zas
const xpto = () => 11

bar(dummy)   // > [Function: dummy]
bar(dummy()) // > 11
bar(function(){ return 7})
bar(zas)
bar(doe)
bar(() => 7)