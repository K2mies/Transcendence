import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import MyForm from "./Form.jsx"
import isSigned from "./IsSigned.ts"

function Header() {
	return (
		<div>
			<nav className="header">
				<Link to="/">GoodPlays</Link>
				<Link to="/explore">Explore</Link>
				<Link to="/mygames">My games</Link>
			</nav>
		</div>
	)
}

function Home() {
	if (!isSigned.value) {
		return (
			<div>
				<h1>GoodPlays</h1>
				<h2>Welcome to GoodPlays!</h2>
				<p>Already have an account?</p>
				<p>New user?</p>
				<Link to="/register">Sign up!</Link>
			</div>
		)
	} else {
		return (
			<Header></Header>
			/* Here we should have the home page displayed after signing in.
				What is displayed, how does it differ from Explore? */
		)
	}
}

function SignUp() {
	return (
		<div>
			<h2>Sign up to GoodPlays</h2>
			<MyForm></MyForm>
		</div>
	)
}

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			{/* <Route path="/explore" element={<Explore />} />
			<Route path="/mygames" element={<MyGames />} /> */}
			<Route path="/register" element={<SignUp />} />
		</Routes>
    </BrowserRouter>
  )
}

export default App
