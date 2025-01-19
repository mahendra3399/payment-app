import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  return (
      <div className="bg-slate-300 h-screen flex justify-center">
          <div className="flex flex-col justify-center">
              <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                  <Heading label={"Sign in"} />
                  <SubHeading label={"Enter your credentials to access your account"} />
                  <InputBox onChange={e => setUsername(e.target.value)} placeholder="user@gmail.com" label={"Email"} />
                  <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
                  <div className="pt-4">
                      <Button onClick={async () => {
                          try {
                              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                  username,
                                  password
                              }, {
                                  headers: {
                                      'Content-Type': 'application/json'
                                  }
                              });
                              if (response.data.error) {
                                  throw new Error(response.data.error);
                              }
                              localStorage.setItem("token", response.data.token);
                              localStorage.setItem("pay-user", JSON.stringify(response.data));
			                        setAuthUser(response.data);
                               // Assuming the response contains user data
                              navigate("/dashboard");
                          } catch (error) {
                              toast.error("Invalid username or password");
                              console.log(error);
                          }
                      }} label={"Sign in"} />
                  </div>
                  <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
              </div>
          </div>
          <ToastContainer />
      </div>
  );
};

export default Signin;