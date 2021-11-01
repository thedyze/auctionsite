import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import AuctionContextProvider from "./contexts/AuctionContextProvider";

import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import {AuctionDetails} from "./pages/AuctionDetails";
import {Registration} from "./pages/Registration";
import {Buying} from "./pages/Buying";
import {Selling} from "./pages/Selling";
import {CreateListing} from "./pages/CreateListing";
import {About} from "./pages/About";
import {NotFound404} from "./pages/NotFound404"

function App() {
  return (

    <div>
      <AuctionContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/auction-details/{id}" component={AuctionDetails}/>
            <Route exact path="/registration" component={Registration}/>
            <Route exact path="/buying" component={Buying}/>
            <Route exact path="/selling" component={Selling}/>  
            <Route exact path="/create-listing" component={CreateListing}/> 
            <Route exact path="/about" component={About}/>
            <Route path="*" component={NotFound404}/>
          </Switch>
        </Router>
      </AuctionContextProvider>
    </div>
  );
}

export default App;
