import { React, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebaseConf";

const SignIn = React.lazy(() => import("./Pages/SignIn"));
const Page404 = React.lazy(() => import("./Pages/Page404"));

function App() {
  const [user] = useAuthState(auth);
  // let user = "sdfvd";

  return (
    <Suspense>
      <Router>
        <Routes>
          {user ? (
            <>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.component}
                  />
                );
              })}
            </>
          ) : (
            <>
              <Route path="/" element={<SignIn />} />
              <Route path="*" element={<SignIn />} />
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.privateRoute ? <Page404 /> : route.component}
                  />
                );
              })}
              )
            </>
          )}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
