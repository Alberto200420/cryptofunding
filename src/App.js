import Error404 from "pages/Error404";
import PublicPage from "pages/PublicRound";
import Home from "pages/Home";
import HowItIsFor from "pages/HowItIsFor";
import ComoFunciona from "pages/HowItWorks";
import TipsForInvesting from "pages/TipsForInvesting";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Matnejar la rutas
import { MoralisProvider } from "react-moralis";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <MoralisProvider initializeOnMount={false}>
      <Router>
        <Routes>
          {/* Home Display */}
          <Route path="/" element={<Home />} />
          {/* ¿Como funciona? */}
          <Route path="/how-it-works" element={<ComoFunciona />} />
          {/* ¿Para quien es T-mis? */}
          <Route path="/how-is-tmis-for" element={<HowItIsFor />} />
          {/* Consejos para invertir */}
          <Route path="/tips-for-investing" element={<TipsForInvesting />} />
          {/* Pagina Publica */}
          <Route path="/project" element={<PublicPage />} />
          {/* Dashboard */}
          <Route path="/creator" element={<Dashboard />} />
          {/* Error Display */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </MoralisProvider>
  );
}

export default App;
