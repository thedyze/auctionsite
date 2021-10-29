
export const Registration = () => {


  const handleFormSubmit = (e) => {
    e.preventDefault();

  };

  const formStyle = `h-screen flex flex-col justify-center items-center p-4 mt-12 my-12`
  const formElementStyle = `w-full`
  const radioElementStyle = `flex justify-between w-full px-16 mt-8 my-8`
  const inputStyle = `w-full py-2 mb-8 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out `
  const buttonStyle = `bg-blue-500 hover:bg-blue-700 my-4 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`
  const h1 = `font-bold text-xl items-center p-4 pt-12 mt-12 `


  return <div>

    <form className={formStyle} onSubmit={handleFormSubmit}>
      <h1 className={h1}>Register new account</h1>
      <div className={formElementStyle}>
        <label for="username">Username </label>
        <input className={inputStyle} type="username" placeholder="Your username" required></input>
      </div>
      <div className={formElementStyle}>
        <label for="email">Email </label>
        <input className={inputStyle} type="email" placeholder="Email adress" required></input>
      </div>
      <div className={formElementStyle}>
        <label for="password">Password</label>
        <input className={inputStyle} type="password" placeholder="Your Password" required></input>
      </div>
      <div className={formElementStyle}>
        <label for="confirm-password">Confirm Password</label>
        <input className={inputStyle} type="password" placeholder="Confirm Password" required></input>
      </div>

      <div className={formElementStyle}>
        <label for="account">Account type </label>
        <div className={radioElementStyle}>
          <div>
          <label class="container">Private </label>
          <input type="radio" checked={true} />
          <span class="checkmark"></span>
          </div>
          <div>
          <label class="container">Organization </label>
          <input type="radio" />
          <span class="checkmark"></span>
          </div>
        </div>
      </div>

      <div className={formElementStyle}>
        <label for="org-name">Organization name</label>
        <input className={inputStyle} type="org-name" placeholder="Organization name" required></input>
      </div>

      <div className={formElementStyle}>
        <label for="org-nr">Organization number</label>
        <input className={inputStyle} type="org-nr" placeholder="Organization number" required></input>
      </div>


      <div className='flex justify-center items-center mt-6'>
        <button className={buttonStyle}>Create Account</button>
      </div>
    </form>
  </div>

};
