import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import { authenticate } from "./store/session";
import LoginPage from "./components/LoginPage";
import ServersSidebar from "./components/Servers/ServersSidebar";
import ChannelSideBar from "./components/ChannelSideBar";
// import TestChannels from "./components/Servers/TestChannels";
import Home from "./components/Home/"
import FriendsList from './components/FriendsList'
import MessageForm from "./components/MessageForm";
import ChannelTopBar from "./components/ChannelTopBar";
import UserMenu from "./components/UserMenu";
import ServerMembers from "./components/ServerMembers"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // setIsLoaded(false);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path='/register'>
          <SignupFormPage />
        </Route>
      </Switch>
      {isLoaded && (
        <>
          <ServersSidebar />
          <Switch>
            <Route path='/channels/@me'>
              <FriendsList />
              <UserMenu />
            </Route>
            <Route path="/channels/:serverId/:channelId">
              <ChannelSideBar />
              <ChannelTopBar />
              <MessageForm />
              <UserMenu />
              <ServerMembers />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
