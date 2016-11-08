// let makeAdder = function (add) {
//     return function (x) {
//         return x + add;
//     }
// };
//

let makeAdder = add => x => add + x;

let add2 = makeAdder(2);
let add5 = makeAdder(5);

console.log(add2(3)); // 5
console.log(add5(5)); // 10
