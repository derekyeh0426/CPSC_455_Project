import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogInForm from './components/LogInForm';
import RegistrationForm from './components/RegistrationForm';
import About from './components/About';
import { Nav } from 'react-bootstrap';

import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div>
      <LogInForm />
      <RegistrationForm />
      <About />
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
