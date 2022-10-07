import React, { useEffect } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsLock } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

// https://codepen.io/ig_design/pen/KKVQpVP
export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, dirtyFields: dirtyFieldsLogin },
  } = useForm();

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup, dirtyFields: dirtyFieldsSignup },
  } = useForm();

  const loginSubmit = (data) => {
    localStorage.setItem("token", data.email);
    navigate("/");
  };

  const signupSubmit = (data) => {
    localStorage.setItem("token", data.email);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label for="reg-log"></label>

                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <form onSubmit={handleSubmitLogin(loginSubmit)}>
                          <div className="section">
                            <h4 className="mb-4 pb-3">Log In</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                name="logemail"
                                className="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autocomplete="off"
                                {...registerLogin("email", {
                                  required: "Email tidak boleh kosong",
                                  pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                      "Harap masukkan format email yang valid",
                                  },
                                })}
                              />
                              <MdOutlineAlternateEmail className="input-icon" />
                              {errorsLogin.email && (
                                <Form.Text className="text-danger">
                                  {errorsLogin.email.message}
                                </Form.Text>
                              )}
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Your Password"
                                id="logpass"
                                autocomplete="off"
                                {...registerLogin("password", {
                                  required: "Password tidak boleh kosong",
                                  pattern: {
                                    value:
                                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message:
                                      "Format password minimal 8 karakter, 1 huruf besar, 1 huruf kecil dan minimal 1 spesial karater",
                                  },
                                })}
                              />
                              <BsLock className="input-icon" />
                              {errorsLogin.password && (
                                <Form.Text className="text-danger">
                                  {errorsLogin.password.message}
                                </Form.Text>
                              )}
                            </div>
                            <button
                              className="button mt-4"
                              disabled={
                                !dirtyFieldsLogin.email ||
                                !dirtyFieldsLogin.password
                              }
                            >
                              submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="card-back">
                      <div className="center-wrap">
                        <form onSubmit={handleSubmitSignup(signupSubmit)}>
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Sign Up</h4>
                            <div className="form-group">
                              <input
                                type="text"
                                name="logname"
                                className="form-style"
                                placeholder="Your Full Name"
                                id="logname"
                                autocomplete="off"
                                {...registerSignup("f_name", {
                                  required: "Full Name tidak boleh kosong",
                                })}
                              />
                              <AiOutlineUser className="input-icon" />
                              {errorsSignup.f_name && (
                                <Form.Text className="text-danger">
                                  {errorsSignup.f_name.message}
                                </Form.Text>
                              )}
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autocomplete="off"
                                {...registerSignup("email", {
                                  required: "Email tidak boleh kosong",
                                  pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                      "Harap masukkan format email yang valid",
                                  },
                                })}
                              />
                              <MdOutlineAlternateEmail className="input-icon" />
                              {errorsSignup.email && (
                                <Form.Text className="text-danger">
                                  {errorsSignup.email.message}
                                </Form.Text>
                              )}
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Your Password"
                                id="logpass"
                                autocomplete="off"
                                {...registerSignup("password", {
                                  required: "Password tidak boleh kosong",
                                  pattern: {
                                    value:
                                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                    message:
                                      "Format password minimal 8 karakter, 1 huruf besar, 1 huruf kecil dan minimal 1 spesial karater",
                                  },
                                })}
                              />
                              <BsLock className="input-icon" />
                              {errorsSignup.password && (
                                <Form.Text className="text-danger">
                                  {errorsSignup.password.message}
                                </Form.Text>
                              )}
                            </div>
                            <button
                              className="button mt-4"
                              disabled={
                                !dirtyFieldsSignup.email ||
                                !dirtyFieldsSignup.password ||
                                !dirtyFieldsSignup.f_name
                              }
                            >
                              submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
