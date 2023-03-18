import Header from "components/HomeHeader"
import Navbar from "components/Navbar"
import Layout from "hocs/layouts/Layout"

function Home() {
    return(
        <Layout>
            <Navbar/>
            <div className="pt-28">
                <Header/>
            </div>
            <div className="-mt-14">
                <p className=" text-gray-400 text-center">&copy; 2023 T-mis Dapp. All rights reserved<a href={`mailto:albertog1meza@gmail.com`} rel='noreferrer' target='_blank' className='pl-10'>contact</a></p>
            </div>
        </Layout>
    )
}

export default Home