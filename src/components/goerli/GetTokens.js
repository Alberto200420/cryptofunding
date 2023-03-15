import BUSD from '../../assets/img/BUSD.png'
import USDT from '../../assets/img/USDT.png'
import USDC from '../../assets/img/USDC.png'
import DAI from '../../assets/img/DAI.png'
import { useEffect, useState } from 'react'
import { TOKEN_TEST } from "../../abi/TokensTest"
import { ethers } from 'ethers'
import ModalLoading from "../ModalMinando"
import ModalSuccess from '../ModalSuccess'

export default function GetTokens() {
  const [Moneda, setMoneda] = useState({ moneda: null })
  const { moneda } = Moneda
  const conCual = e => setMoneda({ ...Moneda, [e.target.name]: e.target.value }) //formData
  const [cargandoData, setCargandoData] = useState(false)
  const [dataCargada, setDataCarga] = useState(false)
  const [ercToken, setErcToken] = useState('')

  const investWhit =(e)=> {
    e.preventDefault();
    if(moneda === "USDT") {
      ObtenerTokensTest('0x5e2283Ac73C40aCfcb892852dDBDe532D98E0E22', '10000000000')
      setErcToken('0x5e2283Ac73C40aCfcb892852dDBDe532D98E0E22')
    } else if (moneda === "USDC") {
      ObtenerTokensTest('0x079D3631b5F8Caa65cC0D98DF09C1F1db9278104', '10000000000')
      setErcToken('0x079D3631b5F8Caa65cC0D98DF09C1F1db9278104')
    } else if (moneda === "BUSD") {
      ObtenerTokensTest('0x7eCf2d0344724bbd03d87d5Fbb64f3eC4379597D', '10000000000000000000000')
      setErcToken('0x7eCf2d0344724bbd03d87d5Fbb64f3eC4379597D')
    } else if (moneda === "DAI") {
      ObtenerTokensTest('0xd0A342DaED6679795Db8ea5cA7c3F66fC49f5C29', '10000000000000000000000')
      setErcToken('0xd0A342DaED6679795Db8ea5cA7c3F66fC49f5C29')
    }
  }

  const ObtenerTokensTest = async (tokenAddress, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const addressSigner = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const erc20 = new ethers.Contract(tokenAddress, TOKEN_TEST, signer)
    const tx = await erc20.mint(addressSigner[0], amount)
    setCargandoData(true)
    await tx.wait();
    setCargandoData(false)
    setDataCarga(true)
  }

  useEffect(() => {
    if (dataCargada === true) {
      setTimeout(function() {
        setDataCarga(false)
      }, 10000);
    }
  },[])

  return(
    <div className='pt-2'>
      <form onSubmit={e=>investWhit(e)}>
          <label className='text-center inline-flex pr-1'>
              <input type="radio" name='moneda' className='absolute opacity-0 w-0 h-0' value='BUSD' onChange={e=>conCual(e)} required/>
              <img className="rounded-md w-10 cursor-pointer" src={ BUSD } alt="BUSD"/>
          </label>

          <label className='text-center inline-flex px-2'>
              <input type="radio" name='moneda' className='absolute opacity-0 w-0 h-0' value='USDT' onChange={e=>conCual(e)} required/>
              <img className="rounded-md w-10 cursor-pointer" src={ USDT } alt="USDT"/>
          </label> 

          <label className='text-center inline-flex px-2'>
              <input type="radio" name='moneda' className='absolute opacity-0 w-0 h-0' value='USDC' onChange={e=>conCual(e)} required/>
              <img className="rounded-md w-10 cursor-pointer" src={ USDC } alt="USDC"/>
          </label>

          <label className='text-center inline-flex pl-1'>
              <input type="radio" name='moneda' className='absolute opacity-0 w-0 h-0' value='DAI' onChange={e=>conCual(e)} required/>
              <img className="rounded-md w-10 cursor-pointer" src={ DAI } alt="DAI"/>
          </label><br/>
          <button type="submit" className="boton-connect"> Get tokens test </button>
      </form>

      {cargandoData === true ? <ModalLoading/> : <div></div> }
      {dataCargada === true ? <ModalSuccess mensaje={`Please add this address ${ercToken} to your metamask wallet on the goerli network`}/> : <div></div> }
    </div>
  )
}