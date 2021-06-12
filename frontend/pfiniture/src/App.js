import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogInForm from './components/LogInForm';
import RegistrationForm from './components/RegistrationForm';
import About from './components/About';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <LogInForm />
      <RegistrationForm />
      <About/>
    </div>
  );
}

export default App;
