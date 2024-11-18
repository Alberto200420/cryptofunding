import InfoSmartContract from "components/InfoContract"
import Navbar from "components/Navbar"
import BotonFirmar from "components/BotonFirmar"
import { useLocation, Navigate } from "react-router-dom"

function PublicPage() {
    const location = useLocation()
    const datos = location.state
    if(!datos) {
        return <Navigate to={'/'}/>
    }
    return(
        <div>
            <Navbar/>
            <main>
                <div className="text-center">
                    <div className="inline-flex rounded-sm px-8">
                        <img className="rounded-md w-24" alt="personal" src={ datos[0].personalFile }/>
                    </div>
                    <div className="inline-flex rounded-sm px-8">
                        <img className="rounded-md w-24" alt="logo" src={ datos[0].logo }/>
                    </div>
                    <BotonFirmar address={datos[0].contractAddress} network={datos[0].network}/>
                </div>
                <InfoSmartContract/>
            </main>
        </div>
    )
}

export default PublicPage