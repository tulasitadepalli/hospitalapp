import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Appointment from './components/Appointment';
// import Home from './components/Home';
import Patientportal from './components/Patientportal';
// import Specialities from './components/Patientportal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

      {/* <Link to='/home'>Aboutus</Link>
      <Link to='/specialties'>Specialities</Link> */}
      <Link to='/patientportal'>Patientportal</Link>
      <Link to='/appointment'>Appointment</Link>
     
     <Switch>
        {/* <Route path='/' exact component={Home}></Route>
        <Route path='/home' exact component={Home}></Route>
        <Route path='/specialties' exact component={Specialities}></Route> */}
        <Route path='/patientportal' exact component={Patientportal}></Route>
        <Route path='/appointment' exact component={Appointment}></Route>
      </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
