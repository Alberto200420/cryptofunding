import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import BUSD from '../assets/img/BUSD.png'
import USDT from '../assets/img/USDT.png'
import USDC from '../assets/img/USDC.png'
import DAI from '../assets/img/DAI.png'
import { ethers } from 'ethers'
import { MaxUint256, PERMIT2_ADDRESS, SignatureTransfer } from '@uniswap/permit2-sdk'
import { Permit2Abi } from "../abi/Permit2_ABI"
import { TOKEN_TEST } from "../abi/TokensTest"
import { ABI_TMIS_DESARROLLADOR_GO } from "../abi/TMIS_GO_TEST"
import ModalLoading from "./ModalMinando"
import ModalSuccess from './ModalSuccess'
import { useMoralis } from "react-moralis"

export default function BotonFirmar({ address, network }) {
  let [isOpen, setIsOpen] = useState(false)
  const [cargandoData, setCargandoData] = useState(false)
  const [dataCargada, setDataCarga] = useState(false)
  const [ abiCreador, setAbiCreador ] = useState()
  const [ usdt, setUsdt ] = useState('')
  const [ usdc, setUsdc ] = useState('')
  const [ busd, setBusd ] = useState('')
  const [ dai, setDai ] = useState('')
  const [ AbiUSDT, setAbiUSDT ] = useState()
  const [ AbiUSDC, setAbiUSDC ] = useState()
  const [ AbiBUSD, setAbiBUSD ] = useState()
  const [ AbiDAI, setAbiDAI ] = useState()
  const { isWeb3Enabled, account } = useMoralis()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() =>{
    if(network === 'Goerli') {
      setUsdt('0x5e2283Ac73C40aCfcb892852dDBDe532D98E0E22')
      setUsdc('0x079D3631b5F8Caa65cC0D98DF09C1F1db9278104')
      setBusd('0x7eCf2d0344724bbd03d87d5Fbb64f3eC4379597D')
      setDai('0xd0A342DaED6679795Db8ea5cA7c3F66fC49f5C29')
      setAbiUSDT(TOKEN_TEST)
      setAbiUSDC(TOKEN_TEST)
      setAbiBUSD(TOKEN_TEST)
      setAbiDAI(TOKEN_TEST)
      setAbiCreador(ABI_TMIS_DESARROLLADOR_GO)
      console.log('useEffect de BotonFirmar envio los datos')
    } else if (network === 'Poligon') {
      // PON TOKENS AQUI EN setState
      console.log('Estas en poligon')
    }
  },[])

  useEffect(() => {
    if(isWeb3Enabled) {
      ControlFunciones()
      console.log('Se llamaron a las funciones de boton firmar')
    }
  },[account])

  // --------------------------------------------------------   Funciones
  const [ yaRetiro, setYaRetiro ] = useState(false)
  const [ Yaloquido, setYaloquido] = useState(false)
  const [ SeRealizo, setSeRealizo] = useState(true)

  const ControlFunciones = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contrato = new ethers.Contract(address, abiCreador, signer)
    try {
      const YaSacoElDinero = await contrato.YaSacoElDinero()
      setYaRetiro(YaSacoElDinero)
      if(YaSacoElDinero === true) {
        const yaLiquido = await contrato.yaLiquido()
        const seRealizoElProyecto = await contrato.seRealizoElProyecto()
        setYaloquido(yaLiquido)
        setSeRealizo(seRealizoElProyecto)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const withdrawWithProfits = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contrato = new ethers.Contract(address, abiCreador, signer)
    try {
      const withdrawForinvestors = contrato.withdrawForinvestors()
      setCargandoData(true)
      await withdrawForinvestors.wait();
      setCargandoData(false)
      setDataCarga(true)
    } catch (error) {
      console.log(error)
    }
  }

  const withdrawNOTProfits = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contrato = new ethers.Contract(address, abiCreador, signer)
    try {
      setCargandoData(true)
      const withdrawInvestorsNotWin = contrato.withdrawInvestorsNotWin()
      await withdrawInvestorsNotWin.wait();
      setCargandoData(false)
      setDataCarga(true)
    } catch (error) {
      console.log(error)
    }
  }

  const [formData, setFormData] = useState({ cantidad_a_invertir: 0 })
  const [Moneda, setMoneda] = useState({ moneda: null })

  const { cantidad_a_invertir } = formData
  const { moneda } = Moneda

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const conCual = e => setMoneda({ ...Moneda, [e.target.name]: e.target.value }) //formData

  const investWhit =(e)=> {
    e.preventDefault();
    if(moneda === "USDT") {
      const amount = cantidad_a_invertir + "000000"
      VerificarToken(usdt, AbiUSDT, amount)
    } else if (moneda === "USDC") {
      const amount = cantidad_a_invertir + "000000"
      VerificarToken(usdc, AbiUSDC, amount)
    } else if (moneda === "BUSD") {
      const amount = cantidad_a_invertir + "000000000000000000"
      VerificarToken(busd, AbiBUSD, amount)
    } else if (moneda === "DAI") {
      const amount = cantidad_a_invertir + "000000000000000000"
      VerificarToken(dai, AbiDAI, amount)
    }
  }

  const VerificarToken = async (tokenAddress, abiToken, amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const addressSigner = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const erc20 = new ethers.Contract(tokenAddress, abiToken, signer)
    var outPut = await erc20.allowance(addressSigner[0], PERMIT2_ADDRESS)
    if(outPut.toString() === "0") {
      setCargandoData(true)
      const tx = await erc20.approve(PERMIT2_ADDRESS, MaxUint256)
      await tx.wait();
      setCargandoData(false)
    }
    Firmar(tokenAddress, addressSigner, signer, amount) 
  }

  const Firmar = async (token, addressSigner, signer, amount) => {
    const permit2 = new ethers.Contract(PERMIT2_ADDRESS, Permit2Abi, signer)
    const nonces = await permit2.nonceBitmap(addressSigner[0], 0)
    const nonce = nonces.toNumber()
    const deadline = Math.trunc((Date.now() + 900 * 1000) / 1000)
    const PermitTransferFrom = {
      permitted: {
          token: token,                                       // token we are permitting to be transferred
          amount: amount                                      // amount we are permitting to be transferred
      },
      spender: address,                                       // Address al que le queremos enviar los tokens
      nonce: nonce,
      deadline: deadline                                      // signature deadline
    };
    const { domain, types, values } = SignatureTransfer.getPermitData(PermitTransferFrom, PERMIT2_ADDRESS, 5)
    openModal()
    let signature = await signer._signTypedData(domain, types, values)
    invertir(token, amount, nonce, deadline, signature, signer)
  }

  const invertir = async (token, amount, nonce, deadline, signature, signer) => {
    const contract = new ethers.Contract(address, abiCreador, signer)
    closeModal()
    setCargandoData(true)
    const tx = await contract.Invest(token, amount, nonce, deadline, signature)
    await tx.wait();
    setCargandoData(false)
    setDataCarga(true)
  }
  // --------------------------------------------------------   Funciones

  return (
    <div className='pt-6'>
        {yaRetiro === true && Yaloquido === true && SeRealizo === true ? 
        <button className='boton-connect' onClick={withdrawWithProfits}>Withdraw with profits</button>
        :
        yaRetiro === true && Yaloquido === true && SeRealizo === false ?
        <button className='boton-connect' onClick={withdrawNOTProfits}>Withdraw with not profits</button>
        :
        yaRetiro === true && Yaloquido === false ?
        <p>El desarrollador ya retiro el dienro nadie puede invertir</p> 
        :
        <form onSubmit={e=>investWhit(e)} method="POST"> {/*  PUSE method si hay problemas quitalo */}
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
            <input type="text" className='border-2 border-gray-500 rounded-lg outline-none text-center w-52 py-1.5 ' 
            name="cantidad_a_invertir" onChange={e=>onChange(e)} placeholder='Amount' required/>
            <p className="text-sm font-medium text-gray-400">Before to start investing you must read <a href='/TipsForInvesting' target="_blank" className='text-git-color'>Tips before investing</a></p>
            <button type="submit"className="boton-crear "> invest with </button>
        </form>
        }
      
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <div className='mt-4'>
                    <h1 className='text-2xl font-medium text-gray-900'>Amount you will invest: {cantidad_a_invertir}</h1>
                    <h1 className='pt-2 text-2xl font-medium text-gray-900'> token: {moneda}</h1>
                    <h1 className='py-2 text-sm font-medium text-gray-900 md:text-2xl'>Contract address: {address}</h1>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {cargandoData === true ? <ModalLoading/> : <div></div> }
      {dataCargada === true ? <ModalSuccess mensaje={`you have invested successfully ${cantidad_a_invertir - 2} ${moneda} to ${address} Network commission: 2 ${moneda}`}/> : <div></div> }
    </div>
  )
}
