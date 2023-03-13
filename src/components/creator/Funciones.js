import { ABI_TMIS_DESARROLLADOR_GO } from "../../abi/TMIS_GO_TEST"
import { TOKEN_TEST } from "../../abi/TokensTest"
// importar las ABI de las monedas estables
import { MaxUint256, PERMIT2_ADDRESS, SignatureTransfer } from '@uniswap/permit2-sdk'
import { Permit2Abi } from "../../abi/Permit2_ABI"
import { ethers } from 'ethers'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useLocation } from 'react-router-dom'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import ModalLoading from "components/ModalMinando"
import ModalSuccess from "components/ModalSuccess"
import BUSD from '../../assets/img/BUSD.png'
import USDT from '../../assets/img/USDT.png'
import USDC from '../../assets/img/USDC.png'
import DAI from '../../assets/img/DAI.png'

export default function FuncionesDesarrollador() {
  const location = useLocation()
  const datos = location.state;
  const [ abiCreador, setAbiCreador ] = useState()
  const [cargandoData, setCargandoData] = useState(false)
  const [dataCargada, setDataCarga] = useState(false)
  const [mensaje, setMensaje] = useState()
  const [ balance, setBlance ] = useState(0)
  const [ devolverDyOcho, setDevolverDyOcho ] = useState()
  const [ devolverSIX, setDevolverSix ] = useState()
  const [ YALIQUIDO, setYaLiquido ] = useState(false)
  const [ seRealizo, setSeRealizo ] = useState(false)
  const [ BalanceSIX, setBalanceSIX ] = useState()
  const [ BalanceDyOcho, setBalanceDyOcho ] = useState()
  const [ yaRetiro, setYaRetiro ] = useState()
  const [ DataContract, setDataContract ] = useState(false)
  const [ usdt, setUsdt ] = useState('')
  const [ AbiUSDT, setAbiUSDT ] = useState()
  const [ usdc, setUsdc ] = useState('')
  const [ AbiUSDC, setAbiUSDC ] = useState()
  const [ busd, setBusd ] = useState('')
  const [ AbiBUSD, setAbiBUSD ] = useState()
  const [ dai, setDai ] = useState('')
  const [ AbiDAI, setAbiDAI ] = useState()
  const [ TOKEN, setTOKEN ] = useState()
  const [ NONCE, setNONCE ] = useState()
  const [ DEADLINE, setDEADLINE ] = useState()
  const [ SIGNATURE, setSIGNATURE ] = useState()
  let [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ cantidad_a_invertir: 0 })
  const [Moneda, setMoneda] = useState({ moneda: null })

  const { cantidad_a_invertir } = formData
  const { moneda } = Moneda

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const conCual = e => setMoneda({ ...Moneda, [e.target.name]: e.target.value }) //formData
  // const [ cargado, setCargado ] = useState(false)

  // -------------------------------- WEB3 Functions
  const GetSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contrato = new ethers.Contract(datos[0].contractAddress, abiCreador, signer)
    try {
      const YaSacoElDinero = await contrato.YaSacoElDinero()
      const sixContractBalance = await contrato.sixContractBalance()
      const DyOchoContractBalance = await contrato.DyOchoContractBalance()
      const SIXbalance = sixContractBalance.toString()
      const DyOchoBalance = DyOchoContractBalance.toString()
      const balanceDyOcho = Number(DyOchoBalance.slice(0, -18));
      const balanceSIX = Number(SIXbalance.slice(0, -6));
      if(YaSacoElDinero === true) {
        const devolverDyOcho = await contrato.verCuantoDevolverasDyOcho()
        const yaLiquido = await contrato.yaLiquido()
        const seRealizoElProyecto = await contrato.seRealizoElProyecto()
        const devolverSIX = await contrato.verCuantoDevolverasSix()
        const outputDyOcho = devolverDyOcho.toString()
        const outputSIX = devolverSIX.toString()
        setYaLiquido(yaLiquido)
        setSeRealizo(seRealizoElProyecto)
        setDevolverDyOcho(outputDyOcho)
        setDevolverSix(outputSIX)
      }
      setBalanceSIX(SIXbalance)
      setBalanceDyOcho(DyOchoBalance)
      setBlance(balanceDyOcho + balanceSIX)
      setYaRetiro(YaSacoElDinero)
      setDataContract(true)
    } catch (error) {
      console.log(error)
    }
  }

  const withdraw = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contrato = new ethers.Contract(datos[0].contractAddress, abiCreador, signer)
    try {
      setCargandoData(true)
      const withdrawForOwner = await contrato.withdrawForOwner()
      await withdrawForOwner.wait();
      setCargandoData(false)
      setMensaje('Amount succesfully withdrawn')
      setDataCarga(true)
    } catch (error) {
      console.log(error)
    }
  }

  const firmar =(e)=> {
    e.preventDefault();
    if(moneda === "USDT") {
      VerificarToken(usdt, AbiUSDT)
    } else if (moneda === "USDC") {
      VerificarToken(usdc, AbiUSDC)
    } else if (moneda === "BUSD") {
      VerificarToken(busd, AbiBUSD)
    } else if (moneda === "DAI") {
      VerificarToken(dai, AbiDAI)
    }
  }

  const VerificarToken = async (tokenAddress, abiToken) => {
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
    Firmar(tokenAddress, addressSigner, signer) 
  }

  const Firmar = async (token, addressSigner, signer) => {
    const permit2 = new ethers.Contract(PERMIT2_ADDRESS, Permit2Abi, signer)
    const nonces = await permit2.nonceBitmap(addressSigner[0], 0)
    const nonce = nonces.toNumber()
    const deadline = Math.trunc((Date.now() + 900 * 1000) / 1000)
    const PermitTransferFrom = {
      permitted: {
          token: token,                                       // token we are permitting to be transferred
          amount: cantidad_a_invertir                         // amount we are permitting to be transferred
      },
      spender: datos[0].contractAddress,                      // Address al que le queremos enviar los tokens
      nonce: nonce,
      deadline: deadline                                      // signature deadline
    };
    const { domain, types, values } = SignatureTransfer.getPermitData(PermitTransferFrom, PERMIT2_ADDRESS, 5)
    let signature = await signer._signTypedData(domain, types, values)
    setTOKEN(token)
    setNONCE(nonce)
    setDEADLINE(deadline)
    setSIGNATURE(signature)
    openModal()
  }

  const devolver = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(datos[0].contractAddress, abiCreador, signer)
    closeModal()
    setCargandoData(true)
    try {
      if(moneda === 'USDT' || moneda === 'USDC') {
        const tx = await contract.devolverCantidadSix(TOKEN, cantidad_a_invertir, NONCE, DEADLINE, SIGNATURE)
        await tx.wait();
        setCargandoData(false)
        setMensaje('Amount with interest returned correctly')
        setDataCarga(true)
      } else if(moneda === 'BUSD' || moneda === 'DAI') {
        const tx = await contract.devolverCantidadDyOcho(TOKEN, cantidad_a_invertir, NONCE, DEADLINE, SIGNATURE)
        await tx.wait();
        setCargandoData(false)
        setMensaje('Amount with interest returned correctly')
        setDataCarga(true)
      }
    } catch (error) {
      setCargandoData(false)
      console.log(error)
    }
  }

  const devolverContratiempo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(datos[0].contractAddress, abiCreador, signer)
    closeModal()
    setCargandoData(true)
    try {
      if(moneda === 'USDT' || moneda === 'USDC') {
        const tx = await contract.DevolverPorContratiempoSix(TOKEN, cantidad_a_invertir, NONCE, DEADLINE, SIGNATURE)
        await tx.wait();
        setCargandoData(false)
        setMensaje('Amount without interest returned correctly')
        setDataCarga(true)
      } else if(moneda === 'BUSD' || moneda === 'DAI') {
        const tx = await contract.DevolverPorContratiempoDyOcho(TOKEN, cantidad_a_invertir, NONCE, DEADLINE, SIGNATURE)
        await tx.wait();
        setCargandoData(false)
        setMensaje('Amount without interest returned correctly')
        setDataCarga(true)
      }
    } catch (error) {
      setCargandoData(false)
      console.log(error)
    }
  }
  // -------------------------------- WEB3 Functions

  function Eterscan() {
    const creador = datos[0].creatorAddress
    const contrato = datos[0].contractAddress

    if(datos[0].network === 'Goerli') {
      return (
        <div className="relative mb-2">
          <h1 className='text-gray-500'>Address of the creator:
          <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500'
          href={`https://goerli.etherscan.io/address/${datos[0].creatorAddress}`}
          rel='noreferrer' target='_blank'>
            {creador.slice(0, 6) +"..." +creador.slice(38, 42)} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
          </h1>
          <h1 className='text-gray-500'>Contract address:
          <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500'
          href={`https://goerli.etherscan.io/address/${datos[0].contractAddress}`}
          rel='noreferrer' target='_blank'
          >{contrato.slice(0, 6) +"..." +contrato.slice(38, 42)} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
          </h1>
          <h1 className='text-gray-500'>Status: <p className="text-black inline-flex"> 
          {yaRetiro === false ? 'Active round' 
          :
          yaRetiro === true && YALIQUIDO === false ? 'Retired capital' 
          :
          YALIQUIDO === true && seRealizo === true ? 
          'Amount returned with the performance' 
          :
          YALIQUIDO === true && seRealizo === false ? 
          'Amount returned without the yield'
          :
          <></>}</p></h1>

          {yaRetiro === true && YALIQUIDO === false ? 
          <h1 className='text-gray-500'>Amount you must return whit USDT or USDC: <p className="text-black inline-flex">{devolverSIX}</p></h1> 
          : 
          <></> }
          {yaRetiro === true && YALIQUIDO === false ? 
          <h1 className='text-gray-500'>Amount you must return whit BUSD or DAI: <p className="text-black inline-flex">{devolverDyOcho}</p></h1> 
          : 
          <div>
            <h1 className='text-gray-500'>Balance in USDC or USDT: <p className="text-black inline-flex">{BalanceSIX}</p></h1>
            <h1 className='text-gray-500'>Balance in BUSD or DAI: <p className="text-black inline-flex">{BalanceDyOcho}</p></h1>
          </div>
          }
          <h1 className='text-gray-500'>Contract Balance: <p className="text-black inline-flex">{balance}</p></h1>
        </div>
      )
    } else if (datos[0].network === 'Poligon') {
      <div className="relative">
        <h1 className='text-gray-500'>Address of the creator:
        <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500'
        href={`https://polygonscan.com/address/${datos[0].creatorAddress}`}
        rel='noreferrer' target='_blank'
        >{creador.slice(0, 6) +"..." +creador.slice(38, 42)} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
        </h1><br/>
        <h1 className='text-gray-500'>Contract address:
        <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500'
        href={`https://polygonscan.com/address/${datos[0].contractAddress}`}
        rel='noreferrer' target='_blank'
        >{contrato.slice(0, 6) +"..." +contrato.slice(38, 42)} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
        </h1>
        {yaRetiro === true ? <h1 className='text-gray-500'>Status: <p className="text-black inline-flex">Capital retirado</p></h1> : <h1 className='text-gray-500'>Status: <p className="text-black inline-flex">Ronda activa</p></h1> }
        {yaRetiro === true ? <h1 className='text-gray-500'>Amount you must return whit USDT or USDC: <p className="text-black inline-flex">{devolverSIX}</p></h1> : <></> }
        {yaRetiro === true ? <h1 className='text-gray-500'>Amount you must return whit BUSD or DAI: <p className="text-black inline-flex">{devolverDyOcho}</p></h1> : <></> }
      </div>
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() =>{
    if(datos[0].network === 'Goerli') {
      setAbiCreador(ABI_TMIS_DESARROLLADOR_GO)
      setUsdt('0x5e2283Ac73C40aCfcb892852dDBDe532D98E0E22')
      setUsdc('0x079D3631b5F8Caa65cC0D98DF09C1F1db9278104')
      setBusd('0x7eCf2d0344724bbd03d87d5Fbb64f3eC4379597D')
      setDai('0xd0A342DaED6679795Db8ea5cA7c3F66fC49f5C29')
      setAbiUSDT(TOKEN_TEST)
      setAbiUSDC(TOKEN_TEST)
      setAbiBUSD(TOKEN_TEST)
      setAbiDAI(TOKEN_TEST)
      console.log('useEffect de Funciones desarrollador envio los datos')
    } else if (datos[0].network === 'Poligon') {
      // PON TOKENS AQUI EN setState
      console.log('Estas en poligon')
    }
  },[datos])

  useEffect(() => {
    if(dataCargada === true) {
      setDataCarga(false)
    }
  },[dataCargada])

  return(
    <div className="py-4">
      <div className=" px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          {/* INFORMAICON DEL CONTRATO */}
          <Eterscan/>
          {cargandoData === true ? <ModalLoading/> : <div></div> }
          {dataCargada === true ? <ModalSuccess mensaje={mensaje}/> : <></>}
          {yaRetiro === true ?
            <form onSubmit={e=>firmar(e)} className='pl-14'>
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
              <input type="text" className='border-2 border-gray-500 rounded-lg outline-none text-center w-52 py-1.5 mb-1.5' 
              name="cantidad_a_invertir" onChange={e=>onChange(e)} placeholder='Amount' required/>
              <button type="submit"className="flex rounded-md border border-transparent bg-blue-100 px-12 py-2 mx-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Sign transaction</button>
            </form>
            : 
            <></> 
            }
            {yaRetiro === false ? <button className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={withdraw}>Withdraw</button>: <></> }
            
            <div className="py-2">
              
            </div>
          
          <div className="ml-4 mt-2 flex-shrink-0">
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
                          <h1 className='text-2xl font-medium text-gray-900'>Signed amount: {cantidad_a_invertir}</h1>
                          <h1 className='pt-2 text-2xl font-medium text-gray-900'> token: {moneda}</h1>
                          <h1 className='py-2 text-sm font-medium text-gray-900 md:text-2xl'>Contract address: {datos[0].contractAddress}</h1>
                        </div>
                        <button className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={devolverContratiempo}>Return amount for setback</button>
                        <div className="pt-2">
                          <button className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={devolver}>Return amount</button> 
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            {/* BOTONES PARA INTERACTUAR */}
            {DataContract === false ? <button className="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={GetSigner}>Obtener</button>: <></> }
          
          </div>
        </div>
      </div>
    </div>
  )
}