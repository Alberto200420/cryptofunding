import BUSD from '../assets/img/BUSD.png'
import USDT from '../assets/img/USDT.png'
import USDC from '../assets/img/USDC.png'
import DAI from '../assets/img/DAI.png'

export default function Coins() {
    return(
        <div className='inline-flex absolute pt-1 pl-1'>
            <img className="rounded-md w-7 ml-2" src={ BUSD } alt="BUSD"/>
            <img className="rounded-md w-7 ml-2" src={ USDT } alt="USDT"/>
            <img className="rounded-md w-7 ml-2" src={ USDC } alt="USDC"/>
            <img className="rounded-md w-7 ml-2" src={ DAI } alt="DAI"/>
        </div> 
    )
}