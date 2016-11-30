import fetchJSON from "./fetchJSON";

fetchJSON("/coders.json").then(function (json) {
    var age = 0;

    for (var i = 0, l = json.length; i < l; i++) {
        age += json[i].age;
    }

    console.log(age);
});
