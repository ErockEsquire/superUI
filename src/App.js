import React, { useState, useEffect } from 'react'
import './App.scss';
import Navbar from './components/nav'
import Header from './components/header'
import { Tasks } from './components/tasks'
import Map from './components/map'
// import NotFound from './components/notFound'

import { Route, Switch, Redirect } from 'react-router-dom';

function App() {

  const [position, setPosition] = useState(null)

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        position => {geolocationCallback(position)}
      )
      const geolocationCallback = (position) => {
        setPosition([position.coords.latitude, position.coords.longitude])
      }
    }
    const interval = setInterval(fetchLocation(), 3000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="App">
      <main id="main">
        <Header />
        <Switch>
          <Route exact={true} path="/" render={() => <Tasks scooters={scooters} position={position}/>} />
          <Route exact={true} path="/tasks" render={() => <Tasks scooters={scooters} position={position}/>} />
          <Route exact={true} path="/map" render={() => <Map scooters={scooters} position={position} center={position}/>} />
          {/* <Route path="/404" component={NotFound} />
          <Redirect to="/404" /> */}
        </Switch>
      </main>
      <Navbar />
    </div>
  );
}

const scooters = [
  {name: "Skeeter", issue: "Fell in Charles river.", priority: "10", note: "Bring someone with you.", location: "100 Memorial Drive, Cambridge, MA 02139", coords: [42.360327, -71.086115]},
  {name: "Salem", issue: "Low Battery.", priority: "4", note: "", location: "463 Massachusetts Ave, Cambridge, MA 02139", coords: [42.363932, -71.101126]},
  {name: "Scooty-Puff Jr.", issue: "Broken Wheel.", priority: "7", note: "Retrieve and return.", location: "Faneuil Hall", coords: [42.360305, -71.055853]},
  {name: "Manchester By the Sea", issue: "Check handlebars.", priority: "2", note: "", location: "43 Monument Sq, Charlestown, MA 02129", coords: [42.375738, -71.061242]},
  {name: "Scooty-Puff Sr.", issue: "Check maintainance.", priority: "3", note: "", location: "16 Tyler St, Boston, MA 02111", coords: [42.350847, -71.060724]},
]

export default App;
