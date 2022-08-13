import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from "react";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Navigation/Header";
import { Home } from './components/Home/Home';
import { Login } from './components/Authentication/Login';
import { Logout } from "./components/Authentication/Logout";
import { Register } from './components/Authentication/Register';
import { TicketDetails } from './components/Tickets/TicketDetails';
import { TicketList } from './components/Tickets/TicketsList';
import { ProfilesList } from './components/Profile/ProfilesList';
import { YourProfile } from './components/Profile/YourProfile';
import { AuthContext } from './contexts/AuthContext';
import { TicketsContext } from './contexts/TicketsContext';
import { ProfileContext } from './contexts/ProfileContext';

import * as ticketService from './services/tickets_services';
import * as profileService from './services/profile_service';

import {useLocalStorage} from './hooks/useLocalStorage';


function App() {
  // can move here all tickets state/effect and then pass to home(where create can be) and ticketlist(with details)
  const [auth, setAuth] = useLocalStorage('auth', {});

  const userLogin = (authData) => {
    setAuth(authData)
  };

  const [tickets, setTickets] = useState([]);

  useEffect(() => {if(auth.id) {
    ticketService.getAllTickets()
        .then(tickets => setTickets(tickets))}
  },[auth.id, tickets.length]);

  const [yourprofile, setYourProfile] = useState([]);

  useEffect(() => {if(auth.id) {
    profileService.getProfileDetails(auth.id)
          .then(profile => setYourProfile(profile))}
  },[auth.id]);



  return (
    <div>
      <AuthContext.Provider value={{auth, userLogin}}>
        <TicketsContext.Provider value={{tickets, setTickets}}>
          <ProfileContext.Provider value={{yourprofile, setYourProfile}}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/ticketlist" element={<TicketList />}></Route>
              <Route path="/profile" element={<YourProfile />}></Route>
              <Route path="/profileslist" element={<ProfilesList />}></Route>
              <Route path="/ticketlist/:ticketId" element={<TicketDetails />}></Route>
            </Routes>

            <Footer />
          </ProfileContext.Provider>
        </TicketsContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
