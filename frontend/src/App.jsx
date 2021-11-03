import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

//contexts
import AuctionDetailsContextProvider from "./contexts/AuctionDetailsContext";
import TagContextProvider from "./contexts/TagContext";
import UserContextProvider from "./contexts/UserContext";


//components
import Navbar from "./components/Navbar";

//pages
import { Home } from "./pages/Home";
import { AuctionDetails } from "./pages/AuctionDetails";
import { Buying } from "./pages/Buying";
import { Selling } from "./pages/Selling";
import { CreateListing } from "./pages/CreateListing";
import { NotFound404 } from "./pages/NotFound404";
import { UserProvider } from "./context/UserContext";
import AuctionContextProvider from "./contexts/AuctionContextProvider";
import {Registration} from "./pages/Registration";
import {About} from "./pages/About";

function App() {
  

  return (
    <div>
      <UserProvider>
      <UserContextProvider>
      <AuctionContextProvider>
      <AuctionDetailsContextProvider>
      <TagContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auction-details/:id" component={AuctionDetails} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/buying" component={Buying} />
            <Route exact path="/selling" component={Selling} />
            <Route exact path="/create-listing" component={CreateListing} />
            <Route exact path="/about" component={About} />
            <Route path="*" component={NotFound404} />
          </Switch>
        </Router>
      </TagContextProvider>
      </AuctionDetailsContextProvider>
      </AuctionContextProvider>
      </UserContextProvider>
      </UserProvider>
    </div>
  );
}

export default App;
