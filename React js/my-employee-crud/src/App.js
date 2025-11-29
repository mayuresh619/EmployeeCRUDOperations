import './App.css';
import LoginPage from "./components/LoginPage";
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Assuming you have a Home component

function App() {
  return (
    <Routes>
      {/* Route for the login component */}
      <Route path="/" element={<LoginPage test = "Login Page" />} /> 
      {/* Route for the target Home page */}
      <Route path="/home" element={<Home />} /> 
      {/* You can add more routes here */}
    </Routes>
  );
}

export default App;
