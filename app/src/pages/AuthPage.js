import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/httpHook";
import { useMessage } from "../hooks/messageHook";

export const AuthPage = () => {
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log("data", data);
      message(data.message)
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      console.log("data", data);
      message(data.message)
    } catch (error) {}
  };

  return (
    <div className="row center">
      <div className="col s6 offset-s3">
        <h1>Shorten the link</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input type="text" id="email" onChange={changeHandler} />
                <label for="email">Email</label>
              </div>

              <div className="input-field">
                <input id="password" type="password" onChange={changeHandler} />
                <label for="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn waves-effect yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Log in
            </button>
            <button
              className="btn waves-effect grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
