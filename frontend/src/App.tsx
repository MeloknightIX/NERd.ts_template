import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/pages/Home";
import NotFound from "./views/pages/NotFound";
import RequireAuth from "./views/components/RequireAuth";
import Signin from "./views/pages/Signin";
import Protected from "./views/components/examples/Protected";
import ChangePassword from "./views/pages/ChangePassword";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <Protected />
              </RequireAuth>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/changepw"
            element={
              <RequireAuth>
                <ChangePassword to="/protected" />
              </RequireAuth>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
