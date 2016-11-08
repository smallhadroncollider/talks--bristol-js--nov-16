import fetchJSON from "./fetchJSON";

fetchJSON("/coders.json").then(function (json) {
    console.log(json);
});
