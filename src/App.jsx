import "./App.css";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { FirebaseProviderApp } from "./firebase/context";
import Error from "./pages/Error";
import Main from "./layout/Main";

import Inicio from "./pages/Inicio";

import Pdf from "./pages/Pdf";
import Client from "./pages/Client";
import AddClient from "./components/AddClient";

import AddItem from "./components/newQoutation/AddItem";
import NewForm from "./components/newQoutation/NewForm";
function App() {
  const routers = [
    "/tables",
    "/",
    "/clientes",
    "/cotizacion",
    "/newClient",
    "/newCotizacion",
    "/billing",
  ];

  return (
    <div className="App">
      <FirebaseProviderApp>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path={routers}>
              <Main>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/cotizacion" component={Inicio} />
                <Route exact path="/clientes" component={Client} />
                <Route exact path="/tables" component={Pdf} />
                <Route exact path="/newClient" component={AddClient} />
                <Route exact path="/newCotizacion" component={AddItem} />
                <Route exact path="/billing" component={NewForm} />
              </Main>
            </Route>
            <Route path="*" component={Error} />
          </Switch>
        </BrowserRouter>
      </FirebaseProviderApp>
    </div>
  );
}

export default App;
