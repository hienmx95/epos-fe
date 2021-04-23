import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ConfigDB from "./data/customizer/config";
import { routes } from "config/routes";
import { appTranslation } from "app/app-translation";
// import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Montserrat', 'sans-serif']
//   }
// });

const App = React.lazy(async () => {
  await appTranslation.initialize();
  return import("app/app");
});

const Root = () => {
  const [anim, setAnim] = useState("");
  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";
  const abortController = new AbortController();

  useEffect(() => {
    setAnim(animation);
    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <React.Suspense fallback={null}>
            <App>
              <TransitionGroup>
                <Switch>
                  <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    render={() => {
                      return (
                        <Redirect
                          to={`${process.env.PUBLIC_URL}/dashboard/default`}
                        />
                      );
                    }}
                  />
                  {routes.map(({ path, component: Component }) => (
                    <Route
                      key={path}
                      path={path}
                      render={(props) => {
                        return (
                          <CSSTransition
                            in={props.match != null}
                            timeout={100}
                            classNames={anim}
                            unmountOnExit
                          >
                            <div>
                              <Component />
                            </div>
                          </CSSTransition>
                        );
                      }}
                    ></Route>
                  ))}
                </Switch>
              </TransitionGroup>
            </App>
          </React.Suspense>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
