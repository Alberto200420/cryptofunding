import '../styles/index.css'
import InformacionButton from './info'
import { useEffect } from "react"
import { useMoralis } from "react-moralis"
// import logo from '../assets/img/tmis.png'  <img src={logo} width={60} height={70} className='inline-flex pr-4'/> 

function Navbar() {

    const rea = async () => {
        const ret = await enableWeb3()
        if (typeof ret !== "undefined") {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
            }
        }
        }

    const { enableWeb3, isWeb3Enabled, account, Moralis, deactivateWeb3, chainId: chainIdHex } = useMoralis()

    // Conseguir la red donde esta conectada  
    const chainId = chainIdHex
    // console.log(`ChainId is ${chainId}`) parseInt(chainIdHex)
    
    useEffect(() => { if (!isWeb3Enabled && typeof window !== "undefined" && window.localStorage.getItem("connected")) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return(
        <nav className="w-full shadow-md fixed bg-gray-900">
            <div className=" px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                <p className=' inline-flex text-white pr-4'>{chainId}</p>
                <h3 className=" inline-flex pr-4 text-lg font-medium leading-6 text-white"><a href='/'>T-mis</a></h3>
                <InformacionButton/>
                </div>

            <div className="ml-4 mt-2 flex-shrink-0">
                <button type="button" className="boton-connect" onClick={rea}>
                {account ? account.slice(0, 6) +"..." +account.slice(38, 42): <div>Connect wallet</div>}
                </button>
            </div>

            </div>
            </div>
        </nav>
    )
}

export default Navbar