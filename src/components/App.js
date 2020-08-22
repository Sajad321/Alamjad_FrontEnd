import React, { Fragment, useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
// import CoursesPage from "./courses/CoursesPage";
// import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./common/Loading";
import "react-toastify/dist/ReactToastify.css";
import SendReportsPage from "./salesmen/SendReportsPage";
import SendOrdersPage from "./salesmen/SendOrdersPage";

const apiUrl = process.env.API_URL;
// fontawesome
import initFontAwesome from "./common/initFontAwesome";
initFontAwesome();

function App() {
  const { user, isLoading, error, getAccessTokenSilently } = useAuth0();

  const [role, setRole] = useState("5");

  // const callSecureApi = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();

  //     const response = await fetch(`${apiUrl}/users/${user.sub}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const responseData = await response.json();

  //     setRole(responseData.user.role);
  //   } catch (error) {
  //     setRole(error.message);
  //   }
  // };
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <Header role={role} />
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => <HomePage {...routeProps} role={role} />}
        />
        <Route path="/about" component={AboutPage} />
        <Route path="/reports/send" component={SendReportsPage} />
        <Route path="/orders/send" component={SendOrdersPage} />
        {/* <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} /> */}
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} />
    </Fragment>
  );
}

export default App;
