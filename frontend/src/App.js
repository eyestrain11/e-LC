import logo from './logo.svg';
import './App.css';
import React from "react";
import { Switch, BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import SignIn from "./Components/Register/SignIn.js";
import { AuthProvider } from "./Contexts/AuthContext";
import Home from './Components/pages/Home.js';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';
import KnowMore from './Pages/KnowMore';
import { useState, useEffect } from 'react';
import { useAuth } from './Contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Form from './Forms/Form';
import User_Home from './User_Home/User_Home';
import Footer from './Components/Footer';

function App() {
  const  {
    authUser,
    setAuthUser,
    isloggedin,
    setIsloggedin
} = useAuth();
// const isloggedin = useAuth()
// const [isFetching, setIsFetching] = useState(true);

const navigate = useNavigate();
//   // const { auth } = useAuth();
//   // const refresh = useRefresh();
//   const [refreshing , isRefreshing] = useState(true);
  
  useEffect(() => {
    // isRefreshing(true);
    
    const CallAboutPage= async()=>
{
    // setIsFetching(true);
    console.log("Call about")
        try{
        console.log("tried");
        const res=await fetch('/profilec',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const object= await res.json();
       setAuthUser(object);
        console.log(object);
        setAuthUser(object);
        console.log(authUser);
        setIsloggedin(true);
        console.log(isloggedin);
        // setIsFetching(false);
        if(!res.status===200)
        {
            const error= new Error (res.error);
            alert('There seems to be some issue with your credentials. We are working on it.');
            throw error;
        }
    }
    catch(err){
      setIsloggedin(false);
      console.log(isloggedin);
        console.log(err);
        console.log("caught error");
        setIsloggedin(false);
        // setIsFetching(false);
        navigate("/"); 
       }
  }
  CallAboutPage();
}, []);
  return (
    <div>
      <Navbar />
    {/* <Routers> */}
    {/* // <AuthProvider> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<User_Home></User_Home>}></Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/form" element={<Form></Form>}></Route>
          <Route path="/knowmore" element={<KnowMore />} />
          {/* <Route path="/profile" >
          {isloggedin ? <Profile/> : <Home/>} */}
          {/* <Profile /> */}
          {/* </Route>
          <Route path="/knowmore">
          {isloggedin ? <KnowMore/> : <Home/>} */}
          {/* <KnowMore/> */}
          {/* </Route> */}
      </Routes>
      <Footer></Footer>
      {/* </Routers> */}
      
      </div>
  );
}

export default App;
