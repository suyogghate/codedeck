import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebaseConf";
import ModalProvider from "./Components/Context/ModalContext";
import PlaygroundProvider from "./Components/Context/PlayGroundContext";

const SignIn = React.lazy(() => import("./Pages/SignIn"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
const Page404 = React.lazy(() => import("./Pages/Page404"));

function App() {
  const [user] = useAuthState(auth);
  // console.log(user);

  React.useEffect(() => {}, [user]);
  // let user = "sdfvd";

  return (
    <Suspense>
      <PlaygroundProvider>
        <ModalProvider>
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
                        element={
                          route.privateRoute ? <Page404 /> : route.component
                        }
                      />
                    );
                  })}
                  )
                </>
              )}
            </Routes>
          </Router>
        </ModalProvider>
      </PlaygroundProvider>
    </Suspense>
  );
}

export default App;
