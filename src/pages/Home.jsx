import Header from "components/HomeHeader"
import Navbar from "components/Navbar"

function Home() {
    return(
        <div className="pt-28">
            <Navbar/>
            <main>
                <Header/>
            </main>
        </div>
    )
}

export default Home