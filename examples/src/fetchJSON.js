let json = [{
    "name": "Alice",
    "age": 42
},
{
    "name": "Bob",
    "age": 54
},
{
    "name": "Carol",
    "age": 27
}];

export default () => new Promise((resolve, reject) => resolve(json));
