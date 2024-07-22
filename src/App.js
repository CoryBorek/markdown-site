import HomePage from "./pages/HomePage";
import MDPage from "./pages/MDPage";
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import MDPageWrapper from "./pages/MDPageWrapper";
function App() {
  return (
    <div>
    <Router>
      <Switch>

        <Route path="/:id">
          <MDPageWrapper />
        </Route>

        <Route path="/">
        <MDPage id="/" />
        </Route>

      </Switch>
    </Router>
    </div>
  );
}

export default App;
