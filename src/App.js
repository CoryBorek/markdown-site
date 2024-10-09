import MDPage from "./pages/MDPage";
import MDTest from "./pages/MDTest"
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";

function App() {
  return (
    <div style={{padding: "4%"}}>
    <Router>
      <Switch>

      <Route path="/builtin/test">
          <MDTest />
        </Route>

        
        <Route path="/">
        <MDPage />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
