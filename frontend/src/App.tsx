import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/pages/Home";
import NotFound from "./views/pages/NotFound";
import RequireAuth from "./views/components/RequireAuth";
import Signin from "./views/pages/user/Signin";
import ChangePassword from "./views/pages/user/ChangePassword";
import Delete from "./views/pages/user/Delete";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin to="/" />} />
          <Route
            path="/changepw"
            element={
              <RequireAuth>
                <ChangePassword to="/" />
              </RequireAuth>
            }
          />
          <Route
            path="/delete"
            element={
              <RequireAuth>
                <Delete to="/" />
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
