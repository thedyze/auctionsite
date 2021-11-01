import { RegOrg } from "../components/RegOrg";
import {useState } from "react";
import { useHistory } from "react-router-dom";


const FORM_STYLE = `flex flex-col justify-center items-center px-8`;
const FORM_ELEMENT_SYLE = `w-full`;
const INPUT_STYLE = `w-full px-2 py-2 mb-8 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out `;
const BUTTON_STYLE = `bg-blue-500 hover:bg-blue-700 my-2 py-2 px-8 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`;
const H1 = `font-bold text-xl items-center p-4 mt-8 `;

export const Registration = () => {
  let history=useHistory()
  const [badCred,setBadCred]=useState(false)
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    pass1: "",
    pass2: "",
    role: "private",
  });

  const setOrgData = (data) => {
    setUserData({ ...userData, ...data });
  };

  const noMatch = () => {
    return (
      !userData.pass2 || !userData.pass1 || userData.pass1 !== userData.pass2
    ); 
  };
  const noMatch2 = () => {
    return userData.pass2.length > 1 && noMatch();
  };


  const handleEmail=(e) => {
    setUserData((prev) => ({ ...prev, email: e.target.value }));
    setBadCred(false)
    }
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!noMatch()) {
      let u = userData;
      let newUser = {
        username: u.userName,
        email: u.email,
        password: u.pass2,
        role: u.role,
        orgName: u.orgName,
        orgNr: u.orgNr,
      };
      console.log("newUser before fetch", newUser);
    try {
      let res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });      
      res = await res.json();
      
      let newUserLogin = {
        email:newUser.email,
        password:newUser.password,
      };

      await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserLogin),
    })
    history.goBack()
    } catch (error) {
      console.log("probably email is already taken",error);
      setBadCred(true)
        }  
    
    }
  };

  return (
    <div>
      <form className={FORM_STYLE} onSubmit={handleFormSubmit}>
        <div className={H1}>Register new account</div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Username </label>
          <input
            className={INPUT_STYLE}
            type="username"
            placeholder="Your username"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, userName: e.target.value }));
            }}
            required
          ></input>
        </div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Email </label>
          <input
            className={INPUT_STYLE}
            type="email"
            placeholder="Your email address"
            onChange={handleEmail}
            required
          ></input>
        </div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Password</label>
          <input
            className={INPUT_STYLE}
            type="password"
            placeholder="Your Password"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, pass1: e.target.value }));
            }}
            required
          ></input>
        </div>
        <div className={FORM_ELEMENT_SYLE}>
          <label>Confirm Password</label>
          <input
            className={INPUT_STYLE}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, pass2: e.target.value }));
            }}
            required
          ></input>
          {
            //Temp css
            noMatch2() ? (
              <div style={{ color: "red", textAlign: "center" }}>
                Passwords don't match
              </div>
            ) : (
              <div style={{ color: "transparent" }}>""</div>
            )
          }
          {//Temp css
          badCred&&<div style={{textAlign:"center" ,color:"red"}}>Bad Credentials</div>}
        </div>

        <div className={FORM_ELEMENT_SYLE}>
          <label>Account type </label>
          <div className="flex flex-wrap content-center">
            <RegOrg callback={setOrgData} />
          </div>
        </div>

        <div className="flex justify-center items-center pb-8">
          <button type="submit" className={BUTTON_STYLE}>
            Create Account
          </button>
        </div>
        <div className="min-h-200">&nbsp;</div>
      </form>
    </div>
  );
};
