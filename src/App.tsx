import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Footer />
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
