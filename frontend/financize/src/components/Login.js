import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;

  const HandleLoginSubmit = async(event) => {
    // Prevent page reload
    event.preventDefault();
    const email = document.forms[0][0].value;
    const password = document.forms[0][1].value;
    
    try {
        const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if(response.status === 400){
            alert(data.message)
        } else {
            localStorage.setItem("token", data.data);
            navigate("/")
        }
    } catch (e) {
        console.log(e);
    }
};

    const HandleRegisterSubmit = async(event) => {
        // Prevent page reload
        event.preventDefault();
        const full_name = document.forms[0][0].value;
        const email = document.forms[0][1].value;
        const password = document.forms[0][2].value;
        
        try {
            const response = await fetch(`${BASE_URL}/api/users/register`, {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ full_name, email, password })
            });
            const data = await response.json();
            if(data.message === "Success"){
                setAuthMode("signin")
                window.location.reload();
            } 
        } catch (e) {
              console.log(e);
        }
    };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  let token = localStorage.getItem("token") ? true : false;

  if(token){
    useEffect(() => {
        navigate("/")
    },[])
  } else {
      if (authMode === "signin" ) {
        return (
          <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={(HandleLoginSubmit)}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                {/* <p className="text-center mt-2">
                  Forgot <a href="#">password?</a>
                </p> */}
              </div>
            </form>
          </div>
        )
      }
    
      return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={(HandleRegisterSubmit)}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  type="name"
                  className="form-control mt-1"
                  placeholder="e.g Jane Doe"
                  required={true}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  required={true}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  required={true}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              {/* <p className="text-center mt-2">
                Forgot <a href="#">password?</a>
              </p> */}
            </div>
          </form>
        </div>
      )
  }
}