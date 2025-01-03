import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/pages/Home";
import NotFound from "./views/pages/NotFound";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
