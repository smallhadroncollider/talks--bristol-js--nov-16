var makeLogger = function (message) {
    return function () {
        console.log(message);
    };
}

var run = function (fn) {
    return fn(); 
};

var hello = makeLogger("hello");
run(hello); // "hello"
