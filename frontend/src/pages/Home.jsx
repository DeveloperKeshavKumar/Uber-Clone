import { Link } from 'react-router'

const Home = () => {
    return (
        <div>
            <div className='bg-[url("./Uber-Get-Started.png")] bg-contain h-screen pt-8 flex items-end w-full'>
                <div className='bg-white py-5 px-4 pb-8 w-full'>
                    <h1 className='font-bold text-3xl'>Get Started with Uber</h1>
                    <Link to={'/login'} className='inline-block text-center text-xl font-semibold bg-black text-white w-full py-3 mt-5 rounded-md'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home