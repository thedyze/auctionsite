

export const About = () => {
    return (
        <div>
            <div className="relative bg-homebg bg-cover h-48 w-full text-center ">
                <div className='absolute inset-x-0 font-bold text-6xl font-myHtext text-white pt-16'>About us</div>
            </div>
        <div className='w-full px-2 flex-col flex items-center'>
            <br />
            <div className="font-myPtext text-2xl text-black font-medium px-6">Selling clothes in a sustainable way since October 2021. We care about a green planet, that's why we made our service free.</div>
            <br />
        
            <a className="font-myPtext text-lg font-medium text-myPr-dark fixed bottom-24 px-2 underline" href="mailto:nope@haha.se">Contact us</a>
            <div className="font-myPtext text-sm fixed bottom-2">Copyright 2021</div>
            </div>
        </div>
    )
}