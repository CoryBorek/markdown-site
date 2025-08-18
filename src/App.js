import SidebarPage from "./pages/SidebarPage";
import MDLocal from "./pages/MDLocal";
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";

function App() {
  return (
    <div style={{padding: "4%"}}>
    <Router>
      <Switch>

        <Route exact path="/builtin/test">
            <MDLocal page="test"/>
        </Route>

        <Route exact path="/status">
          <MDLocal page="status"/>
       </Route>

        <Route path="/">
          <SidebarPage />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
