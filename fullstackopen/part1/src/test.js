const arto = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
  greet: function () {
    console.log("hello, my name is " + this.name);
  },
  doAddition: function (a, b) {
    console.log(a + b);
  },
};

arto.growOlder = function () {
  this.age += 1;
};

arto.doAddition(1, 4); // 5 is printed
const referenceToAddition = arto.doAddition;
referenceToAddition(10, 15); // 25 is printed

//console.log(arto.age); // 35 is printed
//arto.growOlder();
//console.log(arto.age); // 36 is printed

////There are two ways to reference the function;
////one is giving a name in a function declaration.
//function product(a, b) {
//  return a * b
//}
//
//const result = product(2, 6)
//// result is now 12

////The other way to define the function is by using a function expression.
////In this case, there is no need to give the function a name and the definition
////may reside among the rest of the code:
//const average = function(a, b) {
//  return (a + b) / 2
//}
//
//const result = average(2, 5)
//// result is now 3.5

//const sum = (p1, p2) => {
//  console.log(p1);
//  console.log(p2);
//  return p1 + p2;
//};
//
//const result = sum(1, 5);
//console.log(result);

////If there is just a single parameter, we can exclude the parentheses from the definition:
////ie:
//const square = (p) => {
//  console.log(p);
//  return p * p;
//};

////If the function only contains a single expression then the braces are not needed.
////In this case, the function only returns the result of its only expression. Now,
////if we remove console printing, we can further shorten the function definition:
//const square = (p) => p * p;

////This form is particularly handy when manipulating arrays - e.g. when using the map method:
//const t = [1, 2, 3];
//const tSquared = t.map((p) => p * p);
//console.log(tSquared);
//// tSquared is now [1, 4, 9]

//const object1 = {
//  name: "Arto Hellas",
//  age: 35,
//  education: "PhD",
//};
//
//const object2 = {
//  name: "Full Stack webapplication development",
//  level: "intermediate studies",
//  size: 5,
//};
//
//const object3 = {
//  name: {
//    first: "Dan",
//    last: "Abramov",
//  },
//  grades: [2, 3, 5, 3],
//  department: "Stanford University",
//};
//
//console.log(object1.name); // Arto Hellas is printed
//const fieldName = "age";
//console.log(object1[fieldName]); // 35 is printed
//
//object1.address = "Helsinki";
//object1["secret number"] = 12341;
//console.log(object1.address);
//console.log(object1["secret number"]);
//// ^this notation is neccecery for instance when there is a space
//// in the property name

////getting specific members from an array
//const t = [1, 2, 3, 4, 5];
//
//const [first, second, ...rest] = t;
//
//console.log(first, second); // 1 2 is printed
//console.log(rest); // [3, 4, 5] is printed

//add's li tags to each value
//const t = [1, 2, 3];
//const m2 = t.map((value) => "<li>" + value + "</li>");
//console.log(m2);

//takes each value and multiplies it by 2
//and creating a new array in the process
//const t = [1, 2, 3];
//
//const m1 = t.map((value) => value * 2);
//console.log(m1); // [2, 4, 6] is printed

//const t = [1, -1, 3];
//
//const t2 = t.concat(5); // creates new array
//
//console.log(t); // [1, -1, 3] is printed
//console.log(t2); // [1, -1, 3, 5] is printed
