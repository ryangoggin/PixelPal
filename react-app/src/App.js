import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import { authenticate } from "./store/session";
import LoginPage from "./components/LoginPage";
import ServersSidebar from "./components/Servers/ServersSidebar";
import ChannelSideBar from "./components/ChannelSideBar";
import SplashPage from "./components/SplashPage";
// import Home from "./components/Home/"
import FriendsList from './components/FriendsList'
import MessageForm from "./components/MessageForm";
import ChannelTopBar from "./components/ChannelTopBar";
import UserMenu from "./components/UserMenu";
import NotFoundPageLoggedOut from "./components/NotFoundPageLoggedOut";
import NotFoundPageLoggedIn from "./components/NotFoundPageLoggedIn";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return(
    <>
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path='/register'>
          <SignupFormPage />
        </Route>
        <Route>
          <NotFoundPageLoggedOut sessionUser={sessionUser}/>
        </Route>
      </Switch>
      {isLoaded && (
        <>
          <ServersSidebar />
          <Switch>
            <Route exact path='/channels/@me'>
              <FriendsList />
              <UserMenu />
            </Route>
            <Route exact path="/channels/:serverId/:channelId">
              <ChannelSideBar />
              <ChannelTopBar />
              <MessageForm />
              <UserMenu />
            </Route>
            <Route>
              <NotFoundPageLoggedIn sessionUser={sessionUser}/>
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
