import fetchJSON from "./fetchJSON";

// v1
// fetchJSON("/coders.json").then(function (json) {
//     var age = 0;
//
//     for (var i = 0, l = json.length; i < l; i++) {
//         age += json[i].age;
//     }
//
//     console.log(age);
// });

// v2
// fetchJSON("/coders.json").then(function (json) {
//     var age = json.reduce(function (total, coder) {
//         return total + coder.age;
//     }, 0);
//
//     console.log(age);
// });

// v3
// fetchJSON("/coders.json").then(function (json) {
//     var age = json.map(function (coder) {
//         return coder.age;
//     }).reduce(function (total, age) {
//         return total + age;
//     }, 0);
//
//     console.log(age);
// });

// v4
// fetchJSON("/coders.json").then(function (json) {
//     return json.map(function (coder) {
//         return coder.age;
//     });
// }).then(function (ages) {
//     return ages.reduce(function (total, age) {
//         return total + age;
//     }, 0);
// }).then(function (age) {
//     return console.log(age);
// });

// v5
// var getAges = function (json) {
//     return json.map(function (coder) {
//         return coder.age;
//     });
// };
//
// var addAges = function (ages) {
//     return ages.reduce(function (total, age) {
//         return total + age;
//     }, 0);
// };
//
// fetchJSON("/coders.json").then(function (json) {
//     return getAges(json);
// }).then(function (ages) {
//     return addAges(ages);
// }).then(function (age) {
//     return console.log(age);
// });


// v6
// let getAges = json => json.map(coder => coder.age);
// let addAges = ages => ages.reduce((total, age) => total + age, 0);
//
// fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);


// v7
// let getAge = coder => coder.age;
// let getAges = json => json.map(getAge);
// let addToTotal = (total, age) => total + age;
// let addAges = ages => ages.reduce(addToTotal, 0);
//
// fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);

// v8
// import { prop, add } from "ramda";
//
// let getAges = json => json.map(prop("age"));
// let addAges = ages => ages.reduce(add, 0);
//
// fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);

// v9
// import { prop, add, map, reduce } from "ramda";
//
// let getAges = map(prop("age"));
// let addAges = reduce(add, 0);
//
// fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);

// v10
// import { pluck, sum } from "ramda";
//
// fetchJSON("/coders.json").then(pluck("age")).then(sum).then(console.log);

// v11
import { pluck, sum, compose } from "ramda";

let totalAges = compose(sum, pluck("age"))

fetchJSON("/coders.json").then(totalAges).then(console.log);
