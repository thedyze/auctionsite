import RegOrg from '../components/RegOrg';


export const Registration = () => {

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  

  const formStyle = `flex flex-col justify-center items-center px-8`
  const formElementStyle = `w-full`
  const inputStyle = `w-full py-2 mb-8 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out `
  const buttonStyle = `bg-blue-500 hover:bg-blue-700 my-2 py-2 px-8 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`
  const h1 = `font-bold text-xl items-center p-4 mt-8 `



  return <div>
    
    <form className={formStyle} onSubmit={handleFormSubmit}>
      <h1 className={h1}>Register new account</h1>
      <div className={formElementStyle}>
        <label>Username </label>
        <input className={inputStyle} type="username" placeholder="Your username" required></input>
      </div>
      <div className={formElementStyle}>
        <label>Email </label>
        <input className={inputStyle} type="email" placeholder="Email adress" required></input>
      </div>
      <div className={formElementStyle}>
        <label>Password</label>
        <input className={inputStyle} type="password" placeholder="Your Password" required></input>
      </div>
      <div className={formElementStyle}>
        <label>Confirm Password</label>
        <input className={inputStyle} type="password" placeholder="Confirm Password" required></input>
      </div>

      <div className={formElementStyle}>
        <label>Account type </label> 
        <div className='flex flex-wrap content-center'>
            <RegOrg />
        </div>
      </div>

      <div className='flex justify-center items-center pb-8'>
        <button className={buttonStyle}>Create Account</button>
      </div>
      <div className='min-h-200'>&nbsp;</div>
    </form>
  </div>

};
