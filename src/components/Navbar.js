import '../styles/index.css'
import InformacionButton from './info'
import { useEffect } from "react"
import { useMoralis } from "react-moralis"
import { ScaleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import poligon from '../assets/img/poligon.png'

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
    // console.log(`ChainId is ${chainId}`)
    
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
            <div className=" px-4 py-3 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                {
                chainId === '0x5' ? <p className='inline-flex text-white pr-2'><Link to='/'>TESTNET</Link></p> 
                : chainId ==='0x89' ? <Link to='/'><img src={poligon} width={50} height={60} alt='Polygon network' className='inline-flex pr-2'/></Link> 
                : <Link to='/'><ScaleIcon width={45} height={50} className='inline-flex pr-2 text-white'/></Link>
                }
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