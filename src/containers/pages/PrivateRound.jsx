import InfoPrivateContract from "components/infoPrivateContract"
import Navbar from "components/Navbar"
import Layout from "hocs/layouts/Layout"
import { UserGroupIcon } from "@heroicons/react/24/solid"
import BotonFirmar from "components/BotonFirmar"
import { useLocation, Navigate } from "react-router-dom"

function PrivatePage() {
    const location = useLocation()
    const datos = location.state
    if(!datos) {
        return <Navigate to={'/'}/>
    }
    return(
        <Layout>
            <Navbar/>
            <div className="pt-28">
                <div className="text-center">
                    <div className="inline-flex rounded-sm px-8">
                        <UserGroupIcon width={150} height={130} className='inline-flex text-black'/>
                    </div>
                    <div className="rounded-sm px-8">
                        <p className="text-sm font-medium text-git-color">Private investment round</p>
                    </div>
                    <BotonFirmar address={datos[0].contractAddress} network={datos[0].network}/>
                </div>
                <InfoPrivateContract/>
            </div>
        </Layout>
    )
}

export default PrivatePage