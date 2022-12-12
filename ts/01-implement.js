var Person = /** @class */ (function () {
    function Person() {
        this.eat = function (food) {
            console.log(food);
        };
    }
    return Person;
}());
var a = new Person();
a.eat('hamburger');
// console.log()
