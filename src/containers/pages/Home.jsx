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
        </Layout>
    )
}

export default Home