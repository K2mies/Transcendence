import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // 👈 import it

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Test() {
  return (
    <div>
      <h1>Test</h1>
      <p>this is some test text for the test page</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar /> {/* 👈 this is what “add Navbar” means */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
