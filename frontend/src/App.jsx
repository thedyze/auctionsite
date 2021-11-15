import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//contexts
import AuctionDetailsContextProvider from "./contexts/AuctionDetailsContext";
import TagContextProvider from "./contexts/TagContext";
import { UserProvider } from "./contexts/UserContext";
import NotificationContextProvider from "./contexts/NotificationContext";
import MessageProvider from "./contexts/MessageContext";
import APIContextProvider from "./contexts/APIContext";

//components
import Navbar from "./components/Navbar";

//pages
import { Home } from "./pages/Home";
import { AuctionDetails } from "./pages/AuctionDetails";
import { Buying } from "./pages/Buying";
import { Selling } from "./pages/Selling";
import { CreateListing } from "./pages/CreateListing";
import { NotFound404 } from "./pages/NotFound404";
import AuctionContextProvider from "./contexts/AuctionContextProvider";
import { Registration } from "./pages/Registration";
import { About } from "./pages/About";
import { Conversation } from "./pages/Conversation";
import { API } from "./pages/API";

function App() {


  return (
    <div className="mt-14">
      <APIContextProvider>
        <UserProvider>
          <NotificationContextProvider>
            <MessageProvider>
              <AuctionContextProvider>
                <AuctionDetailsContextProvider>
                  <TagContextProvider>
                    <Router>
                      <Navbar />
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/auction-details/:id" component={AuctionDetails} />
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/Buying" component={Buying} />
                        <Route exact path="/conversation/:itemId/:userId" component={Conversation} />
                        <Route exact path="/Selling" component={Selling} />
                        <Route exact path="/create-listing" component={CreateListing} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/API" component={API} />
                        <Route path="*" component={NotFound404} />
                      </Switch>
                    </Router>
                  </TagContextProvider>
                </AuctionDetailsContextProvider>
              </AuctionContextProvider>
            </MessageProvider>
          </NotificationContextProvider>

        </UserProvider>
      </APIContextProvider>
    </div>
  );
}

export default App;
