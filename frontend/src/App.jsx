import { Content } from "./Content";
import Navbar from "./Navbar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <Content />
      </UserProvider>
    </div>
  );
}

export default App;
