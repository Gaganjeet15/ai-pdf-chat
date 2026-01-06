import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import ChatApp from "./pages/ChatApp";
import LandingPage from "./pages/LandingPage";
import Presentation from "./pages/Presentation";

function AppLayout() {
  // Show Navbar on all pages for now, or maybe simplified on the chat app?
  // Let's keep the Navbar everywhere but maybe cleaner on the app page

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="app" element={<ChatApp />} />
        <Route path="presentation" element={<Presentation />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </Router>
  );
}

export default App;
