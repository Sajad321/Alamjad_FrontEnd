import React from "react";
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

// fontawesome
import initFontAwesome from "./common/initFontAwesome";
initFontAwesome();

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        {/* <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} /> */}
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
