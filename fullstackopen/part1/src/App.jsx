import Form from "./Form";
import Form02 from "./Form_02";
import { useState } from "react";

//class Person {
//  constructor(name, age) {
//    this.name = name;
//    this.age = age;
//  }
//  greet() {
//    console.log("hello my name is " + this.name);
//  }
//}
//
//const adam = new Person("Adam Ondra", 33);
//adam.greet();
//
//const janja = new Person("Janja Garnbret", 27);
//janja.greet();

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  console.log(props.parts);
  return (
    <div>
      <p>
        {props.parts[0].name} {props.parts[0].exercises}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};

//Component to display the counter result
const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

//Button Component to update with a referenced function
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  // const-definitions
  const [allClicks, setAll] = useState([]);
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);
  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  };
  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };
  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };

  //const [left, setLeft] = useState(0);
  //const [right, setRight] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setClicks({ ...clicks, right: clicks.right + 1 });
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setClicks({ ...clicks, left: clicks.left + 1 });
  };
  //setTimeout(() => setCounter(counter + 1), 1000);
  const name = "Peter";
  const age = 10;

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
        <p>{allClicks.join(" ")}</p>
      </div>
      <div>clicks.left + clicks.right = {clicks.left + clicks.right}</div>
      <div>
        <Display counter={counter} />
        <Button onClick={increaseByOne} text="plus" />
        <Button onClick={setToZero} text="zero" />
        <Button onClick={decreaseByOne} text="minus" />
      </div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <div style={{ marginBottom: "12px" }}>
        <Form />
      </div>
      <div style={{ marginTop: "12px" }}>
        <Form02 />
      </div>
    </div>
  );
};

//const App = () => {
//  // const-definitions
//  const course = "Half Stack application development";
//  const part1 = {
//    name: "Fundamentals of React",
//    exercises: 10,
//  };
//  const part2 = {
//    name: "Using props to pass data",
//    exercises: 7,
//  };
//  const part3 = {
//    name: "State of a component",
//    exercises: 14,
//  };
//
//  return (
//    <div>
//      <Header course={course} />
//      <Content part={part1.name} exercises={part1.exercises} />
//      <Content part={part2.name} exercises={part2.exercises} />
//      <Content part={part3.name} exercises={part3.exercises} />
//      <Total
//        exercises1={part1.exercises}
//        exercises2={part2.exercises}
//        exercises3={part3.exercises}
//      />
//    </div>
//  );
//};

//const App = () => {
//  const course = "Half Stack application development";
//  const part1 = "Fundamentals of React";
//  const exercises1 = 10;
//  const part2 = "Using props to pass data";
//  const exercises2 = 7;
//  const part3 = "State of a component";
//  const exercises3 = 14;
//
//  return (
//    <div>
//      <h1>{course}</h1>
//      <p>
//        {part1} {exercises1}
//      </p>
//      <p>
//        {part2} {exercises2}
//      </p>
//      <p>
//        {part3} {exercises3}
//      </p>
//      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
//    </div>
//  );
//};

//const App = () => {
//  const friends = [
//    { name: "Peter", age: 4 },
//    { name: "Maya", age: 10 },
//  ];
//
//  return (
//    <div>
//      <p>
//        {friends[0].name} {friends[0].age}
//      </p>
//      <p>
//        {friends[1].name} {friends[1].age}
//      </p>
//    </div>
//  );
//};

//const Hello = (props) => {
//  console.log(props);
//  return (
//    <div>
//      <p>
//        Hello {props.name}, you are {props.age} years old
//      </p>
//    </div>
//  );
//};
//
//const App = () => {
//  const name = "Peter";
//  const age = 10;
//
//  return (
//    <>
//      <h1>Greetings</h1>
//      <Hello name="Maya" age={26 + 10} />
//      <Hello name={name} age={age} />
//    </>
//  );
//};

//const App = () => {
//  return (
//    <div>
//      <h1>Greetings</h1>
//      <Hello name="George" />
//      <Hello name="Daisy" />
//    </div>
//  );
//};

//using props
//const Hello = (props) => {
//  return (
//    <div>
//      <p>Hello {props.name}</p>
//    </div>
//  )
//}

//this version uses some variables then passed to the DOM.
//const App = () => {
//  const now = new Date();
//  const a = 10;
//  const b = 20;
//  console.log(now, a + b);
//
//  return (
//    <div>
//      <p>Hello world, it is now {now.toString()}</p>
//      <p>
//        {a} plus {b} is {a + b}
//      </p>
//    </div>
//  );
//};

export default App;
