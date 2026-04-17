const Pizza = (props) =>{
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
}
const App = () => {
  return React.createElement( "div", {}, [
    React.createElement("h1", {}, "Welcome to hell..."),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "best pepperoni Pizza",
    }),
    React.createElement(Pizza, {
      name: "Americano Pizza",
      description: "French fried and hot dogs, wtf Italy",
    }),
    React.createElement(Pizza, {
      name: "The Hawaiian",
      description: "Pinapple and ham, wtf America",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
