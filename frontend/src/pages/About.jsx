

export const About = () => {
    return (
        <div className='w-full px-2 flex-col flex items-center'>
            <h1 className='font-bold text-4xl text-indigo-600 items-center p-4 mt-8 '>About us</h1>
            <br />
            <div className=" font-medium px-6">Selling clothes in a sustainable way since October 2021. We care about the planet, that's why we made our service free.</div>
            <br />
        
            <a className="font-medium text-indigo-600 fixed bottom-16 px-2 underline" href="mailto:nope@haha.se">Contact us</a>
            <div className="fixed bottom-2">Copyright 2021, Group4</div>
        </div>
    )
}