// import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from "react-router-dom";

import { ToastProvider } from "react-toast-notifications";
import { CarsProvider } from "./contexts/CarsContext";
import { DriversProvider } from "./contexts/DriversContext";
import { SpectatorsProvider } from "./contexts/SpectatorsContext";


import Home from "./pages/Home/Home";
import Spectators from "./pages/Spectators/Spectators";
import AddCar from "./pages/AddCar/AddCar";
import UpdateCar from "./pages/UpdateCar/UpdateCar";
import AddDriver from "./pages/AddDriver/AddDriver";
import UpdateDriver from "./pages/UpdateDriver/UpdateDriver";
import AddSpectator from "./pages/AddSpectator/AddSpectator";
import UpdateSpectator from "./pages/UpdateSpectator/UpdateSpectator";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true}>
        <CarsProvider>
          <DriversProvider>
            <SpectatorsProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={`/cars/add`} component={AddCar} />
            <Route path={`/cars/update/:id`} component={UpdateCar} />
            <Route path={`/drivers/add`} component={AddDriver} />
            <Route path={`/drivers/update/:id`} component={UpdateDriver} />
            <Route exact path="/spectators" component={Spectators} />
            <Route path={`/spectators/add`} component={AddSpectator} />
            <Route path={`/spectators/update/:id`} component={UpdateSpectator} />
            <Route path="*" component={NotFound} />
          </Switch>
          </SpectatorsProvider>
          </DriversProvider>
        </CarsProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
