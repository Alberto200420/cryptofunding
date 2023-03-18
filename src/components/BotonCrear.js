import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Switch } from '@headlessui/react'
import axios from 'axios'
import { useMoralis } from "react-moralis"
import { TMIS_ADDRESS, ABI_TMIS_GO } from 'abi/TMIS_GO_TEST'
import { ADDRESS_TMIS_POLYGON, ABI_TMIS_POLYGON } from 'abi/Polygon_ABI'
import { ethers } from 'ethers'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import ModalSuccess from './ModalSuccess'

export default function BotonCrearContrato() {
  let [isOpen, setIsOpen] = useState(false)
  const {chainId: chainIdHex } = useMoralis()
  const chainId = chainIdHex

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // --------------------------------------------------------   Funciones
  const [formData, setFormData] = useState({
    terminos_Y_condiciones: "",
    cantidad_Objetivo_USD: 0,
    rendimiento: 0
  })

  const [enabled, setEnabled] = useState({
    paginaWeb: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    fotoPersonal: null,
    logo: null,
    email: "",
    trayectory: "",
    oficinas: ""
  })

  const { terminos_Y_condiciones, cantidad_Objetivo_USD, rendimiento } = formData
  const { paginaWeb, instagram, twitter, linkedin, fotoPersonal, logo, email, trayectory, oficinas } = enabled
  const [ previewImage1, setPreviweImage1] = useState()
  const [ previewImage2, setPreviweImage2] = useState()


  const enCambio = e => setEnabled({ ...enabled, [e.target.name]: e.target.value })
  const handleFileChange = (event) => {
    setEnabled({ ...enabled, [event.target.name]: event.target.files[0], })
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (event) => {
      setPreviweImage1(reader.result)
    }
  }
  const handleFile2Change = (event) => {
    setEnabled({ ...enabled, [event.target.name]: event.target.files[0], })
    const file = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (event) => {
      setPreviweImage2(reader.result)
    }
  }
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  //------------------------------------------------ FUNCTIONS GOELRI
  const [cargandoData, setCargandoData] = useState(false)
  const [contractData, setContractData] = useState({
    hash: '',
    address_del_creador: '',
    address_del_contrato: '',
    network: ''
  });

  function ModalContractInfo() {
    let [isOpen, setIsOpen] = useState(true)
  
    function closeInfoModal() {
      setIsOpen(false)
    }

    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeInfoModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {
                      contractData.network === 'Goerli' ?
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                          Contract created in Goerli
                        </Dialog.Title>

                        <div className="mt-2">
                          <h1 className="text-sm text-gray-500">
                            Contract address: <br/>
                            <a href={`https://goerli.etherscan.io/address/${contractData.address_del_contrato}`} 
                            rel='noreferrer' target='_blank' 
                            className='text-black no-underline hover:underline hover:text-sky-500'>
                            {contractData.address_del_contrato} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/>
                            </a>
                          </h1>
                          <h1 className="text-sm text-gray-500 pt-2">
                            Creator of the contract: <p className='text-black'>{contractData.address_del_creador}</p>
                          </h1>
                          <h1 className="text-sm text-gray-500 py-2">
                            Transaction hash: <br/>
                            <a href={`https://goerli.etherscan.io/tx/${contractData.hash}`} 
                            rel='noreferrer' target='_blank' 
                            className='text-black no-underline hover:underline hover:text-sky-500'>
                            {contractData.hash} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a></h1>
                          <h1 className="text-sm text-gray-500">
                            Network deployed: <p className='text-black'>{contractData.network}</p>
                          </h1>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeInfoModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </div>

                      :

                      contractData.network === 'Polygon' ?
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                          Contract created
                        </Dialog.Title>
                        <div className="mt-2">
                          <h1 className="text-sm text-gray-500">
                            Contract address: <br/><a href={`https://polygonscan.com/address/${contractData.address_del_contrato}`} 
                            rel='noreferrer' target='_blank' 
                            className='text-black no-underline hover:underline hover:text-sky-500'>
                              {contractData.address_del_contrato} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/>
                              </a>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Creator of the contract: <p className='text-black'>{contractData.address_del_creador}</p>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Transaction hash: <a href={`https://polygonscan.com/tx/${contractData.hash}`} 
                            rel='noreferrer' target='_blank' 
                            className='text-black no-underline hover:underline hover:text-sky-500'>
                              {contractData.hash} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Network deployed: <p className='text-black'>{contractData.network}</p>
                          </h1>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeInfoModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </div>
                      : 
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                          Mining
                        </Dialog.Title>
                        <div className="mt-2">
                          <h1 className="text-sm text-gray-500">
                            Contract address: <br/>
                              <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                  <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                                </div>
                              </div>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Creator of the contract: <br/>
                              <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                  <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                                </div>
                              </div>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Transaction hash: <br/>
                              <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                  <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                                </div>
                              </div>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Network deployed: <br/>
                              <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                  <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                                </div>
                              </div>
                          </h1>
                        </div>
                      </div>
                    }
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }

  
  //------------------------------------------------ FUNCTIONS GOELRI

  const onSubmit = e => {
    e.preventDefault();
    firmar()
    // e.target.reset()
  }

  const firmar = async () => {
    // funcion para crear contrato
    const DyOchoDinero = cantidad_Objetivo_USD / 2 + "000000000000000000"
    const SIXdinero = cantidad_Objetivo_USD / 2 + "000000"
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const address = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    if(chainId === '0x5') {
      try {
        const contract = new ethers.Contract(TMIS_ADDRESS, ABI_TMIS_GO, signer);
        // Call the contract function and get the transaction hash
        closeModal()
        const tx = await contract.crearContrato(terminos_Y_condiciones, DyOchoDinero, SIXdinero, rendimiento);
        setCargandoData(true)
        await tx.wait();
        // Get the contract function result
        const contractAddress = await contract.buscarCONTRATO(address[0]);
        // OBTENIENDO CONTRATO
        setContractData({
          hash: tx.hash, address_del_creador: address[0], address_del_contrato: contractAddress, network: 'Goerli'});
        sendData(address[0], contractAddress)
      } catch (error) {
        console.log(error)
      }
    } else if(chainId === '0x13881') {
      try {
        const contract = new ethers.Contract(ADDRESS_TMIS_POLYGON, ABI_TMIS_POLYGON, signer); // ADDRESS && ABI Polygon
        closeModal()
        const tx = await contract.crearContrato(terminos_Y_condiciones, DyOchoDinero, SIXdinero, rendimiento);
        setCargandoData(true)
        await tx.wait();
        // Get the contract function result
        const contractAddress = await contract.buscarCONTRATO(address[0]);
        // OBTENIENDO CONTRATO 
        setContractData({
          hash: tx.hash, address_del_creador: address[0], address_del_contrato: contractAddress, network: 'Polygon'});
        sendData(address[0], contractAddress)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const sendData = (creatorAddress, contractAddress) => {
    if(enabled) {
      const formularioDATA = new FormData();

      formularioDATA.append('creatorAddress', creatorAddress);
      formularioDATA.append('contractAddress', contractAddress);
      formularioDATA.append('slug', contractAddress)
      formularioDATA.append('rendimiento', rendimiento)
      formularioDATA.append('termsAconditions', terminos_Y_condiciones)
      formularioDATA.append('targetCuantity', cantidad_Objetivo_USD)
      formularioDATA.append('email', email)
      formularioDATA.append('linkInstagram', instagram)
      formularioDATA.append('webPage', paginaWeb)
      formularioDATA.append('linkTwitter', twitter)
      formularioDATA.append('linkedin', linkedin)
      formularioDATA.append('ofice', oficinas)
      formularioDATA.append('personalFile', fotoPersonal)
      formularioDATA.append('logo', logo)
      formularioDATA.append('trayectory', trayectory)
      sendPublic(formularioDATA)
    } else {
      const formularioDATA = new FormData();

      formularioDATA.append('creatorAddress', creatorAddress);
      formularioDATA.append('contractAddress', contractAddress);
      formularioDATA.append('slug', contractAddress)
      formularioDATA.append('rendimiento', rendimiento)
      formularioDATA.append('termsAconditions', terminos_Y_condiciones)
      formularioDATA.append('targetCuantity', cantidad_Objetivo_USD)

      sendPrivate(formularioDATA)
    }
  }

  const sendPublic = (data) => {
      if(chainId === '0x5') {
        console.log('desplegaste el contrato en Goerli publico')
        const goerliUrl = `${process.env.REACT_APP_API_URL}/goerli/send/public`
        enviarData(data, goerliUrl)
      } else if(chainId === '0x13881') {
        console.log('desplegaste el contrato en Polygon publico')
        const poligonUrl = `${process.env.REACT_APP_API_URL}/polygon/send/public`
        enviarData(data, poligonUrl)
      }
  }

  const sendPrivate = (data) => {
      if(chainId === '0x5') {
        console.log('desplegaste el contrato en Goerli pirvado')
        const goerliUrl = `${process.env.REACT_APP_API_URL}/goerli/send/private`
        enviarData(data, goerliUrl)
      } else if(chainId === '0x13881') {
        console.log('desplegaste el contrato en Polygon pirvado')
        const poligonUrl = `${process.env.REACT_APP_API_URL}/polygon/send/private`
        enviarData(data, poligonUrl)
      }
  }

  const [dataCargada, setDataCarga] = useState(false)

  const enviarData = (datos, url) => {
    axios.post(url, datos, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      setDataCarga(true)
    })
    .catch(function (error) {
      console.log(error)
      alert("ERROR contract not saved in the database. Do not panic, your contract was created in the blockchain but we did not keep it, please contact us")
    })
  }
  // --------------------------------------------------------   Funciones


  return (
    <div className='pt-6'>
      <div className='text-center pl-3'>
        <button type="button" onClick={openModal} className="boton-crear">
          Create project
        </button>
      </div>
      
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
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <div className='mt-4'>

                  <form onSubmit={e=>onSubmit(e)}>
                      <label className='text-xl' htmlFor="fname"><h2>Write a contract containing terms and conditions:</h2></label>
                      <textarea  type="text" className='border border-black rounded-lg w-full resize-none outline-none h-72' name="terminos_Y_condiciones" onChange={e=>onChange(e)} required/><br/>
                      <label className='text-xl' htmlFor="lname"><h5>Target quantity:</h5></label>
                      <input type="text" className='appearance-none border border-black rounded-md py-2 px-3 text-gray-700 focus:outline-none' 
                      name="cantidad_Objetivo_USD" onChange={e=>onChange(e)} placeholder='1,000,000.00 $USD' required/><br/><br/>
                      <label className='text-xl' htmlFor="lname"><h5>Investment performance %:</h5></label>
                      <input type="text" className='appearance-none border border-black rounded-md py-2 px-3 text-gray-700 focus:outline-none' 
                      name="rendimiento" onChange={e=>onChange(e)} placeholder='E.G: 25' maxLength='2' required/><br/>

                      <div className="inline-flex py-4">
                        <label className='text-xl px-2' htmlFor="lname"><h5>Private</h5></label>
                        <Switch checked={enabled} onChange={setEnabled}
                            className={`${enabled ? 'bg-green-500' : 'bg-black'}
                            inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                            <span aria-hidden="true" className={`${enabled ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                      </div> 
                        {
                          enabled ? 
                          <div>
                            <input type='url' placeholder='Instagram' name='instagram' onChange={e=>enCambio(e)} className='border border-black rounded-lg w-3/4 py-1.5 outline-none text-center'/><br/><br/>
                            <input type='url' placeholder='Pagina web' name='paginaWeb' onChange={e=>enCambio(e)} className='border border-black rounded-lg w-3/4 py-1.5 outline-none text-center'/><br/><br/>
                            <input type='url' placeholder='Twitter' name='twitter' onChange={e=>enCambio(e)} className='border border-black rounded-lg w-3/4 py-1.5 outline-none text-center'/><br/><br/>
                            <input type='url' placeholder='Linkedin' name='linkedin' onChange={e=>enCambio(e)} className='border border-black rounded-lg w-3/4 py-1.5 outline-none text-center'/><br/><br/>
                            <input type='email' placeholder='Email' name='email' onChange={e=>enCambio(e)} required className='border border-black rounded-lg w-3/4 py-1.5 outline-none text-center'/><br/><br/>
                            <textarea type="text" placeholder='Cuentanos tu trayectoria' name="trayectory" onChange={e=>enCambio(e)} required className='border border-black rounded-lg w-3/4 resize-none outline-none h-52 text-center'/><br/><br/>
                            <input type='url'  placeholder='Oficinas' name='oficinas' onChange={e=>enCambio(e)} className='border border-black rounded-lg w-3/4 py-1.5 outline-none text-center'/><br/><br/>
                            <label className='text-xl' htmlFor="lname"><h5>Personal photo</h5></label>
                            <input type='file' name='fotoPersonal' onChange={handleFileChange} required className='text-sm mt-1 text-black file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-black hover:file:bg-violet-100'/><br/><br/>
                            {previewImage1 ? <img src={previewImage1} className='rounded-md w-24'/> : <></>} 
                            <label className='text-xl' htmlFor="lname"><h5>Brand logo</h5></label>
                            <input type='file' name='logo' onChange={handleFile2Change} required className='text-sm mt-1 text-slate-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-black hover:file:bg-violet-100'/><br/><br/>
                            {previewImage2 ? <img src={previewImage2} className='rounded-md w-24'/> : <></>}
                          </div> : <div></div>
                        }
                       

                      <label className="text-sm ml-3 font-medium text-gray-400">Before to start the investment round you must read <a href='/how-it-works' target="_blank" className='text-git-color'>how T-mis work</a></label>
                      
                      <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      > Start investment round </button>
                      
                    </form>
     
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {cargandoData === true ? <ModalContractInfo/> : <div></div> }
      {dataCargada === true ? <ModalSuccess mensaje={'Contract successfully saved in the database'}/> : <div></div> }
    </div>
  )
}