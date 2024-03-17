import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import axios, { AxiosResponse } from "axios";
import { ApiContext } from "../..";

type SuccessResponse = {
  status: "FETCH_SUCCESS";
  profileId: string;
};

type ErrorResponse = {
  status: "FETCH_FAILED";
  msg: string;
};

type RequestResponse = SuccessResponse | ErrorResponse;

function Login() {
  const url = useContext(ApiContext);

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submitBtnRef = useRef<HTMLButtonElement>(null!);

  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const handleInputChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    submitBtnRef.current.disabled = true
    axios
      .get<RequestResponse>(`${url}/auth/?username=${formData.user}&password=${formData.password}`)
      .then((res) => {
        if (res.data.status === "FETCH_SUCCESS") {
          localStorage.setItem("instagramId", res.data.profileId);
          navigate("/");
        } else {
          setErrorMsg(res.data.msg);
        }
      })
      .catch((err) => console.error(err));

      submitBtnRef.current.disabled = false
  };

  return (
    <div className=" h-screen flex justify-center items-center ">
      <div className="max-w-4xl w-full  py-4 flex gap-5 shadow px-2">
        <div className="relative w-full hidden lg:block">
          <img
            src="/img/loginscreenshot001.png"
            className=" w-[300px] border-4 border-black rounded-3xl"
            alt="instagram login img1"
          />
          <img
            src="/img/loginscreenshot002.png"
            className=" w-[300px] border-4 border-black absolute bg-black top-5 left-28 rounded-3xl"
            alt="instagram login img2"
          />
        </div>
        <div className=" w-full px-5">
          <form onSubmit={login} className="w-full py-10 px-5 md:px-7">
            <div className="mb-20">
              <h2 className="text-2xl uppercase font-extrabold  text-center ">
                Instagram
              </h2>
            </div>

            <p className="text-red-500 font-sans text-semibold">{errorMsg}*</p>
            {/* Login inputs*/}

            <div className="block  mb-3">
              <Input
                type="text"
                label="username or email"
                className="w-full rounded-lg"
                name="user"
                onChange={handleInputChange}
                value={formData.user}
              />
            </div>
            <div className="block mb-5">
              <Input
                type="password"
                label="password"
                className="w-full rounded-lg"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
            <div className="mb-7">
              <button
                className="w-full py-2 rounded-lg bg-blue-500 text-white group"
                ref={submitBtnRef}
              >
                <i className="fa fa-spinner animate-spin !hidden group-disabled:!inline-block"></i>
                <span>Login</span>
              </button>
            </div>

            <div className="mb-5">
              <div className="flex items-center mb-7">
                <span className="w-full border h-px"></span>{" "}
                <span className="px-5">OR</span>{" "}
                <span className="w-full border h-px"></span>
              </div>

              <div className="text-blue-700 text-center">
                <span>
                  <i className="fa-brands fa-facebook"></i> &nbsp; Login with
                  facebook
                </span>
                <br />
                <a
                  href="http://localhost:3000/"
                  className="text-black block font-semibold mt-3"
                >
                  Forget Password?
                </a>
              </div>
            </div>

            <div className="border py-5 text-center w-full">
              <p>
                Don't have an account?{" "}
                <a
                  href="http://localhost:3000/auth/register"
                  className="font-bold text-blue-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
