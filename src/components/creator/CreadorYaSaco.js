import BotonFirmar from "components/BotonFirmar"
import { Link, useLocation } from "react-router-dom"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ABI_TMIS_GO, ABI_TMIS_DESARROLLADOR_GO } from "abi/TMIS_GO_TEST"
import { ethers } from 'ethers'
import BUSD from '../../assets/img/BUSD.png'
import USDT from '../../assets/img/USDT.png'
import USDC from '../../assets/img/USDC.png'
import DAI from '../../assets/img/DAI.png'
import { Token_Test_ABI } from "../../abi/TokensTest"
import { Permit2Abi_Goeri } from "../../abi/Permit2_ABI"
import { MaxUint256, PERMIT2_ADDRESS, SignatureTransfer } from '@uniswap/permit2-sdk'
import ModalLoading from '../../components/ModalSucces'
import ModalSucsessfrom from '../../components/ModalSucces'

export default function CreadorYaSacoElRendimieto() {
  
    // ------------------------------------------------- Validación Goerli
    const location = useLocation()
    const datos = location.state;
    const [contrato, setContrato] = useState(false)
    const [ abiTmis, setAbiTmis ] = useState()
    const [ abiDev, setAbiDev ] = useState()
    const [ abiToken, setAbiToken ] = useState()
    // const [ YaSacoElDineroTorF, setYaSacoElDinero ] = useState()
    const { chainId: chainIdHex, account } = useMoralis()
    const [cantidadAdebolver, setCantidadAdebolver] = useState(0)
    const [isChecked, setIsChecked] = useState(false);
    const [Moneda, setMoneda] = useState({ moneda: null })
    const [formData, setFormData] = useState({ cantidad_a_invertir: 0 })
    const [modalLoading, setModalLoading] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)
    const chainId = chainIdHex
    const { moneda } = Moneda
    const { cantidad_a_invertir } = formData

    const { runContractFunction: buscarCONTRATO } = useWeb3Contract({
        abi: abiTmis,
        contractAddress: datos[0].contractAddress,
        functionName: "buscarCONTRATO",
        params: {_address: datos[0].creatorAddress},
    })
    // const { runContractFunction: YaSacoElDinero } = useWeb3Contract({
    //     abi: abiDev,
    //     contractAddress: datos[0].contractAddress, 
    //     functionName: "YaSacoElDinero",
    //     params: {},
    // })
    const EsElCreadior = async () => {
        const contratoRetornado = await buscarCONTRATO()
        if(contratoRetornado === datos[0].contractAddress ) {
          setContrato(true)
        }
    }

    useEffect(() => {
        if (datos[0].network === 'Goerli') {
            setAbiTmis(ABI_TMIS_GO)
            setAbiDev(ABI_TMIS_DESARROLLADOR_GO)
            setAbiToken(Token_Test_ABI)
        } else if (datos[0].network === 'Poligon') {
            // pon la abi de poligon (desarrollador) aquí setAbi()
            // pon la abi de poligon (tmis) aquí setAbiTmis()
            console.log('estas en poligon')
        }
    },[])

    useEffect(() => {
      // async function yaSaco() {
      //   const yaRetroElDinero = await YaSacoElDinero()
      //   setYaSacoElDinero(yaRetroElDinero)
      // }
      // yaSaco()
      EsElCreadior()
    },[account])

    function closeModal() {
      setIsOpen(false)
    }
    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
      setIsOpen(true)
    }

    function handleCheckboxChange(event) {
      setIsChecked(event.target.checked);
    }

    const conCual = e => setMoneda({ ...Moneda, [e.target.name]: e.target.value })
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
      
    const investWhit =(e)=> {
      e.preventDefault();
      if(chainId === '0x5') {
        FiltrarTokenGoerli()
      } else if(chainId === '0x89') {
        // aqui filtrarás con poligon
        console.log('Invertirás en el contrato en Poligon')
      }
    }

    const FiltrarTokenGoerli = () => {
      if(isChecked === true) {
        if(moneda === "USDT") {
          SIXContratiempo("0x5e2283Ac73C40aCfcb892852dDBDe532D98E0E22")
        } else if (moneda === "USDC") {
          SIXContratiempo("0x079D3631b5F8Caa65cC0D98DF09C1F1db9278104")
        } else if (moneda === "BUSD") {
          DyOchoContratiempo("0x7eCf2d0344724bbd03d87d5Fbb64f3eC4379597D")
        } else if (moneda === "DAI") {
          DyOchoContratiempo("0xd0A342DaED6679795Db8ea5cA7c3F66fC49f5C29")
        }
      } else {
        if(moneda === "USDT") {
          RetornoSIX("0x5e2283Ac73C40aCfcb892852dDBDe532D98E0E22")
        } else if (moneda === "USDC") {
          RetornoSIX("0x079D3631b5F8Caa65cC0D98DF09C1F1db9278104")
        } else if (moneda === "BUSD") {
          RetornoDyOcho("0x7eCf2d0344724bbd03d87d5Fbb64f3eC4379597D")
        } else if (moneda === "DAI") {
          RetornoDyOcho("0xd0A342DaED6679795Db8ea5cA7c3F66fC49f5C29")
        }
      }
    }

        // ---------------------------------------------------------- GLOBALES
        const RetornoDyOcho = async (token) => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const address = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const DesarrolladorContract = new ethers.Contract(datos[0].contractAddress, abiDev, signer)
            const DyOchoAdevolver = await DesarrolladorContract.verCuantoDevolverasDyOcho()
            const amount = DyOchoAdevolver.toString()
            setCantidadAdebolver(amount.slice(0, -18))
            VerificarTokenTest(token, amount, signer, address)
        }

        const RetornoSIX = async (token) => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const address = await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const DesarrolladorContract = new ethers.Contract(datos[0].contractAddress, abiDev, signer)
            const DyOchoAdevolver = await DesarrolladorContract.verCuantoDevolverasSix()
            const amount = DyOchoAdevolver.toString()
            setCantidadAdebolver(amount.slice(0, -6))
            VerificarTokenTest(token, amount, signer, address)
        }

        const DyOchoContratiempo = async (token) => {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const address = await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner()
          const amount = cantidad_a_invertir + "000000000000000000"
          setCantidadAdebolver(cantidad_a_invertir)
          VerificarTokenTest(token, amount, signer, address)
        }

        const SIXContratiempo = async (token) => {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const address = await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner()
          const amount = cantidad_a_invertir + "000000"
          setCantidadAdebolver(cantidad_a_invertir)
          VerificarTokenTest(token, amount, signer, address)
        }

        const VerificarTokenTest = async (tokenAddress, amount, signer, address) => {
            const erc20 = new ethers.Contract(tokenAddress, abiToken, signer)
            var outPut = await erc20.allowance(address[0], PERMIT2_ADDRESS)
            if(outPut.toString() === "0") {
              await erc20.approve(PERMIT2_ADDRESS, MaxUint256)
            }
            Firmar(tokenAddress, address, signer, amount)
        }
        // ---------------------------------------------------------- GLOBALES

        const Firmar = async (token, address, signer, amount) => {
            const permit2 = new ethers.Contract(PERMIT2_ADDRESS, Permit2Abi_Goeri, signer)
            const nonces = await permit2.nonceBitmap(address[0], 0)
            const nonce = nonces.toNumber()
            const deadline = Math.trunc((Date.now() + 900 * 1000) / 1000)
            const PermitTransferFrom = {
              permitted: {
                  token: token,                                       // token we are permitting to be transferred
                  amount: amount                                      // amount we are permitting to be transferred
              },
              spender: datos[0].contractAddress,                      // Address al que le queremos enviar los tokens
              nonce: nonce,
              deadline: deadline                                      // signature deadline
            };
            const { domain, types, values } = SignatureTransfer.getPermitData(PermitTransferFrom, PERMIT2_ADDRESS, 5)
            let signature = await signer._signTypedData(domain, types, values)
            if(isChecked === true) {
              DevolverPorContratimepo(token, amount, signer, nonce, deadline, signature)
            } else {
              Devolver(token, amount, signer, nonce, deadline, signature)
            }
        }

        const Devolver = async (token, amount, signer, nonce, deadline, signature) => {
            openModal()
            const DesarrolladorContract = new ethers.Contract(datos[0].contractAddress, abiDev, signer)
            if(moneda === "USDT" || moneda === "USDC") {
              const tx = await DesarrolladorContract.devolverCantidadSix(token, amount, nonce, deadline, signature)
              closeModal()
              setModalLoading(true)
              await tx.wait();
              setModalSuccess(true)
            } else if(moneda === "BUSD" || moneda === "DAI") {
              const tx = await DesarrolladorContract.devolverCantidadDyOcho(token, amount, nonce, deadline, signature)
              closeModal()
              setModalLoading(true)
              await tx.wait();
              setModalSuccess(true)
            }
        }

        const DevolverPorContratimepo = async (token, amount, signer, nonce, deadline, signature) => {
          openModal()
          const DesarrolladorContract = new ethers.Contract(datos[0].contractAddress, abiDev, signer)
          if(moneda === "USDT" || moneda === "USDC") {
            const tx = await DesarrolladorContract.DevolverPorContratiempoSix(token, amount, nonce, deadline, signature)
            closeModal()
            setModalLoading(true)
            await tx.wait();
            setModalSuccess(true)
          } else if(moneda === "BUSD" || moneda === "DAI") {
            const tx = await DesarrolladorContract.DevolverPorContratiempoDyOcho(token, amount, nonce, deadline, signature)
            closeModal()
            setModalLoading(true)
            await tx.wait();
            setModalSuccess(true)
          }
        }

        if(contrato === true) {
            return(
                <>
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
                    <label>
                      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                      Click on this check box only if you want to return the amount due to a setback 
                      <Link to={'/howItWorks'} target="_blank" className='text-red-600'>Warning</Link>
                    </label>
                    {
                      isChecked === true ? 
                      <input type="text" className='border-2 border-gray-500 rounded-lg outline-none text-center w-52 py-1.5 ' 
                      name="cantidad_a_invertir" onChange={e=>onChange(e)} placeholder='Amount' required/>
                      : 
                      <div></div>
                    }
                    <p className="text-sm font-medium text-gray-400">Before returning the amount you must read <Link to={'/howItWorks'} target="_blank" className='text-git-color'>Tips before investing</Link></p>
                    <button type="submit"className="boton-crear"> Return amount with </button>
                  </form>
                  {/* <button type="submit"className="boton-crear" onClick={}> Return amount with </button> */}

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
                                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                <div className='mt-4'>
                                    <h1 className='text-2xl font-medium text-gray-900'>Amount you will return: {cantidadAdebolver} {moneda}</h1>
                                    <h1 className='pt-2 text-2xl font-medium text-gray-900'>Network: {datos[0].network}</h1>
                                    <h1 className='pt-2 text-2xl font-medium text-gray-900'> token: {moneda}</h1>
                                    <h1 className='py-2 text-sm font-medium text-gray-900 md:text-2xl'>Contract address: {datos[0].contractAddress}</h1>
                                </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            </div>
                        </div>
                        </Dialog>
                  </Transition>
                  {modalLoading === true ? <ModalLoading/> : modalSuccess === true ?  <ModalSucsessfrom/> : <div/>}
                </>
            )
        } else {
            return(
                <>
                <BotonFirmar/>
                </>
            )
        }
}