import  { useState, useContext, useRef} from "react";
import Input from "../../components/Input";
import { ApiContext } from "../..";
import axios from "axios";
import { redirect, useNavigate} from "react-router-dom";


type formType = {
  email: string;
  fullname: string;
  username: string;
  password: string;
};



function Register() {

  const navigate = useNavigate()

  const url = useContext(ApiContext);

  const [formData, setFormData] = useState<formType>({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState<string|null>(null)

  const submitBtnRef = useRef<HTMLButtonElement>(null!)


  const handleInputChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    submitBtnRef.current.disabled = true
    axios
      .post(`${url}/auth/`, formData)
      .then((res) => {

        if (res.data.FETCH_STATUS === "success") {
          localStorage.setItem('instagramId', res.data.profileId)
          navigate('/', {replace: true})
        }else{
          setErrorMsg(res.data.msg)
          redirect('#errorTag')
        }


      })

      .catch((err) =>console.error(err));

      submitBtnRef.current.disabled = false

  };

  return (
    <div className="flex justify-center min-h-screen py-5">
      <div className="max-w-sm w-full h-full border py-10 px-6">
        <h2 className="uppercase text-2xl font-extrabold text-center font-serif">
          Instagram
        </h2>
        <p className="text-center font-semibold text-black/60 py-5 text-lg">
          Sign up to see photos and videos from your friends.
        </p>
        <div>
          <div className="text-white text-center border py-2 bg-blue-600 my-5 rounded-lg">
            <span>
              <i className="fa-brands fa-facebook"></i> &nbsp; Login with
              facebook
            </span>
          </div>

          <div className="flex items-center mb-7">
            <span className="w-full border h-px"></span>{" "}
            <span className="px-5">OR</span>{" "}
            <span className="w-full border h-px"></span>
          </div>
        </div>

        <form onSubmit={register}>
          <p id="errorTag" className="text-red-500 font-semibold p-1">{errorMsg}</p>
          <Input
            label="Email"
            type="email"
            name="email"
            className="w-full rounded"
            onChange={handleInputChange}
          />
          <Input
            label="Full Name"
            type="text"
            name="fullname"
            className="w-full rounded"
            onChange={handleInputChange}
          />
          <Input
            label="username"
            type="text"
            name="username"
            className="w-full rounded"
            onChange={handleInputChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            className="w-full rounded"
            onChange={handleInputChange}
          />
          <div className="text-center px-5 text-black/70 py-5">
            <small className="mb-px block">
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <span className="text-blue-500">Learn More</span>
            </small>
            <br />

            <small>
              By signing up, you agree to our Terms , Privacy Policy and Cookies
              Policy .
            </small>
            <br />
          </div>
          <div className="mb-7">
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-500 text-white group"
              ref={submitBtnRef}
            >
              <i className="fa fa-spinner animate-spin !hidden group-disabled:!inline-block"></i> &nbsp;
              <span>Register</span>
            </button>
          </div>
        </form>

        <div className="border py-5 text-center w-full">
          <p>
            have an account?{" "}
            <a
              href="http://localhost:3000/auth/login"
              className="font-bold text-blue-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
