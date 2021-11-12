import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";

export const LoginTemplate = ({setCurrentUser}) => {
  const history=useHistory()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    let a = JSON.stringify(credentials);
    let response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    let user = await response.json();
  
    if (response.status == 403) {
      console.log("Wrong email/password");
    }
    if (response.status == 200) {
      setCurrentUser(user);
      console.log(user);
    }
  }



  return (
    <div className="min-h-full flex items-center justify-center py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-base font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={login}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-myGr-dark focus:border-myGr-dark focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label tabIndex="2" htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myGr-dark focus:border-myGr-dark focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-xs text-center">
            <div onClick={()=> history.push("/registration")} className="font-medium text-myGr-dark ">
              Register Account
            </div>
          </div>

          <div>
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-myGr-light focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
