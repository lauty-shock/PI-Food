import { Route, Switch } from "react-router-dom";
import "./App.css";

import LandingPage from "./components/First/First";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Create from "./components/Create/Create";
import Fail from "./components/Fail/Fail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/create" component={Create} />
        <Route path="/*" component={Fail} />
      </Switch>
    </div>
  );
}

export default App;
