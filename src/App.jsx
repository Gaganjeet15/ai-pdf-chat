import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import ChatApp from "./pages/ChatApp";
import LandingPage from "./pages/LandingPage";

function AppLayout() {
  const location = useLocation();
  // Show Navbar on all pages for now, or maybe simplified on the chat app?
  // Let's keep the Navbar everywhere but maybe cleaner on the app page

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<ChatApp />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </Router>
  );
}

export default App;
