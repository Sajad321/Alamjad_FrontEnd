import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./common/Loading";
import "react-toastify/dist/ReactToastify.css";
import SendReportsPage from "./salesmen/SendReportsPage";
import SendOrdersPage from "./salesmen/SendOrdersPage";
import ShowPreviousReportsPage from "./salesmen/ShowPreviousReportsPage";
// fontawesome
import initFontAwesome from "./common/initFontAwesome";
initFontAwesome();
// API
const apiUrl = process.env.API_URL;

function App() {
  const {
    user,
    isLoading,
    error,
    getAccessTokenSilently,
    isAuthenticated,
  } = useAuth0();

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  if (isAuthenticated) {
    callSecureApi();
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <HomePage {...routeProps} />}
        />
        <Route path="/reports/:report" component={SendReportsPage} />
        <Route path="/reports" exact component={ShowPreviousReportsPage} />
        <Route path="/reports/send" component={SendReportsPage} />
        <Route path="/orders/send" component={SendOrdersPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} position="top-left" />
    </Fragment>
  );
}

export default App;
