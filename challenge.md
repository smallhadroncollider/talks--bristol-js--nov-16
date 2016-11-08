## v1

Let's start with the old-school mostly procedural style: 

```javascript
fetchJSON("/coders.json").then(function (json) {
    var age = 0;

    for (var i = 0, l = json.length; i < l; i++) {
        age += json[i].age;
    }

    console.log(age);
});
```

---

## v2

Then we notice that we're effectively reducing the items of `json` down to `age`:

```javascript
fetchJSON("/coders.json").then(function (json) {
    var age = json.reduce(function (total, coder) {
        return total + coder.age;
    }, 0);

    console.log(age);
});
```

---

## v3

Then we think, let's simplify the `reduce` by passing in an array of ages rather than coders:

```javascript
fetchJSON("/coders.json").then(function (json) {
    var age = json.map(function (coder) {
        return coder.age;
    }).reduce(function (total, age) {
        return total + age;
    }, 0);

    console.log(age);
});
```

---

## v4

Next, we think, let's use Promises as intended and split this up into a series of `then` statements:

```javascript
fetchJSON("/coders.json").then(function (json) {
    return json.map(function (coder) {
        return coder.age;
    });
}).then(function (ages) {
    return ages.reduce(function (total, age) {
        return total + age;
    }, 0);
}).then(function (age) {
    return console.log(age);
});
```

---

## v5

Next, let's break out the more complex functions to avoid too much nesting:

```javascript
var getAges = function (json) {
    return json.map(function (coder) {
        return coder.age;
    });
};

var addAges = function (ages) {
    return ages.reduce(function (total, age) {
        return total + age;
    }, 0);
};

fetchJSON("/coders.json").then(function (json) {
    return getAges(json);
}).then(function (ages) {
    return addAges(ages);
}).then(function (age) {
    return console.log(age);
});
```

---

## v6

How about getting rid of all those unnecessary wrapper functions and using ES6 syntax:

```javascript
let getAges = json => json.map(coder => coder.age);
let addAges = ages => ages.reduce((total, age) => total + age, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v7

We've still got some nested functions, so let's pull those out:

```javascript
let getAge = coder => coder.age;
let getAges = json => json.map(getAge);
let addToTotal = (total, age) => total + age;
let addAges = ages => ages.reduce(addToTotal, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v8

Then we notice that `addToTotal` is just `add` and the `getAge` could be replaced with a `prop` call:

```javascript
import { prop, add } from "ramda";

let getAges = json => json.map(prop("age"));
let addAges = ages => ages.reduce(add, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v9

Then we remember that Ramda has a curried `map` and `reduce` function:

```javascript
import { prop, add, map, reduce } from "ramda";

let getAges = map(prop("age"));
let addAges = reduce(add, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v10

Then we realise that `reduce(add, 0)` is just `sum` and `map(prop("age"))` is just `pluck("age")`:

```javascript
import { pluck, sum } from "ramda";

fetchJSON("/coders.json").then(pluck("age")).then(sum).then(console.log);
```

---

## v11

Finally, we extract the code to do with totalling the ages into its own function, so we can use it elsewhere: 

```javascript
import { pluck, sum, compose } from "ramda";

let totalAges = compose(sum, pluck("age"))

fetchJSON("/coders.json").then(totalAges).then(console.log);
```
