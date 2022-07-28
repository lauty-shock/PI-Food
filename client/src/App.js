import { Route } from "react-router-dom";
import "./App.css";

import First from "./components/First/First";
import Home from "./components/Home/Home";
import Recipes from "./components/Recipes/Recipes";
import Detail from "./components/Detail/Detail";
import Create from "./components/Create/Create";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={First} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/create" component={Create} />
    </div>
  );
}

export default App;
