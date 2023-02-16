import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import BUSD from '../assets/img/BUSD.png'
import USDT from '../assets/img/USDT.png'
import USDC from '../assets/img/USDC.png'
import DAI from '../assets/img/DAI.png'
import { ethers } from 'ethers'
import { MaxUint256, PERMIT2_ADDRESS, SignatureTransfer } from '@uniswap/permit2-sdk'
import { Permit2Abi_Goeri } from "../abi/Permit2_ABI_goerli"
import { Busd_Test_ABI, Usdt_Test_ABI, USDC_Test_ABI } from "../abi/TokensTest"

export default function BotonFirmar() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // --------------------------------------------------------   Funciones
  const [formData, setFormData] = useState({ cantidad_a_invertir: 0 })
  const [Moneda, setMoneda] = useState({ moneda: null })

  const { cantidad_a_invertir } = formData
  const { moneda } = Moneda

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const conCual = e => setMoneda({ ...Moneda, [e.target.name]: e.target.value }) //formData

  const investWhit =(e)=> {
    e.preventDefault();
    if(moneda === "USDT") {
      VerificarUsdt("0x812c9D3345e29d3029DDE235d01E99d02dAf08F7")
    } else if (moneda === "USDC") {
      VerificarUsdc("0x237c89df66aB0cF2925367Cf169512D7a6F2A1De")
    } else if (moneda === "BUSD") {
      VerificarBusdDai("0xa098213f826cDf0acFe2619b502971e537B1F363")
    } else if (moneda === "DAI") {
      VerificarBusdDai("0x942e0179dBf64CA9B14Da9f2b500672cDADF2E0b")
    }
  }

  const VerificarUsdc = async (tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const address = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const erc20 = new ethers.Contract(tokenAddress, USDC_Test_ABI, signer)
    var outPut = await erc20.allowance(address[0], PERMIT2_ADDRESS)
    const amount = cantidad_a_invertir + "000000"
    if(outPut.toString() === "0") {
      await erc20.approve(PERMIT2_ADDRESS, MaxUint256)
    }
    Firmar(tokenAddress, address, signer, amount) 
  }

  const VerificarUsdt = async (tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const address = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const erc20 = new ethers.Contract(tokenAddress, Usdt_Test_ABI, signer)
    var outPut = await erc20.allowance(address[0], PERMIT2_ADDRESS)
    const amount = cantidad_a_invertir + "000000"
    if(outPut.toString() === "0") {
      await erc20.approve(PERMIT2_ADDRESS, MaxUint256)
    }
    Firmar(tokenAddress, address, signer, amount)
  }

  const VerificarBusdDai = async (tokenAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const address = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const erc20 = new ethers.Contract(tokenAddress, Busd_Test_ABI, signer)
    var outPut = await erc20.allowance(address[0], PERMIT2_ADDRESS)
    const amount = cantidad_a_invertir + "000000000000000000"
    if(outPut.toString() === "0") {
      await erc20.approve(PERMIT2_ADDRESS, MaxUint256)
    }
    Firmar(tokenAddress, address, signer, amount)
  }

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
      spender: "0xacC1fC992912Cc4ce60ee667a2E5f1Af80D47BEF",  // Address al que le queremos enviar los tokens
      nonce: nonce,
      deadline: deadline                                      // signature deadline
    };
    const { domain, types, values } = SignatureTransfer.getPermitData(PermitTransferFrom, PERMIT2_ADDRESS, 5)
    let signature = await signer._signTypedData(domain, types, values)
    openModal()
    console.log(`Token: ${token}`)
    console.log(`Cantidad: ${amount}`)
    console.log(`Nonce: ${nonce}`)
    console.log(`Deadline: ${deadline}`)
    console.log(`Firma: ${signature}`)
  }

  const invertir =(e)=> {
    e.preventDefault();
    console.log("Aquí va la funcion invest")
  }
  // --------------------------------------------------------   Funciones

  // const Dai = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   const signer = provider.getSigner()
  //   const erc20 = new ethers.Contract("0x237c89df66aB0cF2925367Cf169512D7a6F2A1De", USDC_Test_ABI, signer)
  //   await erc20.mint('0x6dC7883728eE8a630c99f4a969B85f0a50647575', "10000000")
  // }        <button onClick={Dai}>Fondear Busd</button>

  return (
    <div className='pt-6'>
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
                    <form onSubmit={e=>invertir(e)}>
                      <h1 className='text-2xl font-medium '>Amount you will invest: {[cantidad_a_invertir, moneda]}</h1>
                      <h1 className='py-2 text-2xl font-medium'>Contract address: {'0xacC1fC992912Cc4ce60ee667a2E5f1Af80D47BEF'}</h1>
                      <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"> 
                      Invest 
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
