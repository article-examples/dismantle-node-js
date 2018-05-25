function printEventually(message) {
    setTimeout(function () {console.log(message);}, 200);
}

function printSoon(message) {
    setTimeout(function () {console.log(message);}, 100);
}

function printNow(message) {
    console.log(message);
}

printEventually('world!');
printNow('Hello');
printSoon('there,');  