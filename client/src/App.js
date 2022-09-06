import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; //useNavigate to go to specific page with function; useParam to get parameters from URL 
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Games from "./pages/Games";
import Uno from "./pages/Uno";
import Help from "./pages/Help";
import UnoCreateRoom from "./pages/UnoCreateRoom";
import UnoJoinRoom from "./pages/UnoJoinRoom";
import Chameleon from "./pages/Chameleon";
import ChameleonCreateRoom from "./pages/ChameleonCreateRoom";
import ChameleonJoinRoom from "./pages/ChameleonJoinRoom";
import ChameleonGame from "./pages/ChameleonGame.js" 
import Navbar from "./components/Navbar"
import { React } from "react" 
import  { socket, SocketContext } from "./socket";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <SocketContext.Provider value={socket}>  
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/games/" element={<Games />}/>
        <Route path="/games/uno" element={<Uno />}/>
        <Route path="/games/uno/createRoom" element={<UnoCreateRoom />}/>
        <Route path="/games/uno/joinRoom" element={<UnoJoinRoom />}/>
        <Route path="/games/chameleon" element={<Chameleon />} />
        <Route path="/games/chameleon/createRoom" element={<ChameleonCreateRoom />} />
        <Route path="/games/chameleon/joinRoom" element={<ChameleonJoinRoom  />} />
        <Route path="games/chameleon/room:gameId/:userName" element={<ChameleonGame />} />
        <Route path="/help" element={<Help/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      </SocketContext.Provider>
    </Router>
  );
}

export default App;
