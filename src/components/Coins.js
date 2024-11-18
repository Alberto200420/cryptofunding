import BUSD from '../assets/img/BUSD.png'
import USDT from '../assets/img/USDT.png'
import USDC from '../assets/img/USDC.png'
import DAI from '../assets/img/DAI.png'

export default function Coins() {
    return(
        <div className='inline-flex space-x-4'>
            <img className="rounded-md lg:w-20 w-14" src={ BUSD } alt="BUSD"/>
            <img className="rounded-md lg:w-20 w-14" src={ USDT } alt="USDT"/>
            <img className="rounded-md lg:w-20 w-14" src={ USDC } alt="USDC"/>
            <img className="rounded-md lg:w-20 w-14" src={ DAI } alt="DAI"/>
        </div> 
    )
}