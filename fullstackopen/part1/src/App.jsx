import Form from "./Form";
import Form02 from "./Form_02";

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

const App = () => {
  // const-definitions
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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />

      <Form02 />
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
