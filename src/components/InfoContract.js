import { Tab } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import { RxInstagramLogo } from 'react-icons/rx'
import { HiOutlineMail } from 'react-icons/hi'
import { MdWeb } from 'react-icons/md'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import GetTokens from './goerli/GetTokens'
import { useMoralis } from "react-moralis"
import { ethers } from 'ethers'
import { ABI_TMIS_DESARROLLADOR_GO, ABI_TMIS_GO, TMIS_ADDRESS } from "../abi/TMIS_GO_TEST"
import { ABI_TMIS_DESARROLLADOR_POLYGON, ABI_TMIS_POLYGON, ADDRESS_TMIS_POLYGON } from 'abi/Polygon_ABI'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InfoSmartContract() {
  const { isWeb3Enabled, account } = useMoralis()
  const [ abiCreador, setAbiCreador ] = useState()
  const [ abiTMIS, setAbiTMIS ] = useState()
  const [ TMISAddress, setTMISAddress ] = useState()
  const [ LoCreo, setLoCreo ] = useState(false)
  const [ yaRetiro, setYaRetiro ] = useState(false)
  const [ balance, setBlance ] = useState(0)
  const [ DyochoInvertido, setDyochoInvertido ] = useState(0)
  const [ CuantoGanaraSIX ,setCuantoGanaraSIX ] = useState('0')
  const [ CuantoGanaraDyOcho ,setCuantoGanaraDyOcho ] = useState('0')
  const [ YaSacoDyOcho, setYaSacoDyOcho ] = useState(false)
  const [ YaSacoSIX, setYaSacoSIX ] = useState(false)
  const [ YALIQUIDO, setYaLiquido ] = useState(false)
  const [ SIXinvertido, setSIXinvertido ] = useState(0)
  const [ DataContract, setDataContract ] = useState(false)
  const location = useLocation()
  const datos = location.state;
  let [categories] = useState({
    Contract: [
      {
        id: datos[0].id,
        title: datos[0].termsAconditions,
        date: datos[0].creationDate
      }
    ],
    Trayectory: [
      {
        id: datos[0].id,
        title: datos[0].trayectory
      }
    ],
  })

  function Eterscan() {
    if(datos[0].network === 'Goerli') {
      return (
        <>
          <h1 className='text-gray-500 inline-flex' >Address of the creator:
          <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
          href={`https://goerli.etherscan.io/address/${datos[0].creatorAddress}`}
          rel='noreferrer' target='_blank'>
            {datos[0].creatorAddress} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
          </h1><br/>
          <h1 className='text-gray-500 inline-flex'>Contract address:
          <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
          href={`https://goerli.etherscan.io/address/${datos[0].contractAddress}`}
          rel='noreferrer' target='_blank'>
            {datos[0].contractAddress} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
          </h1><br/>
        </>
      )
    } else if (datos[0].network === 'Polygon') {
      <>
        <h1 className='text-gray-500 inline-flex' >Address of the creator:
        <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
        href={`https://polygonscan.com/address/${datos[0].creatorAddress}`}
        rel='noreferrer' target='_blank'
        >{datos[0].creatorAddress} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
        </h1><br/>
        <h1 className='text-gray-500 inline-flex'>Contract address:
        <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
        href={`https://polygonscan.com/address/${datos[0].contractAddress}`}
        rel='noreferrer' target='_blank'
        >{datos[0].contractAddress} <ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mb-1'/></a>
        </h1><br/>
      </>
    }
  }

  function ViewDatos() {
    if(DataContract === true) {
      return(
        <>
          <h1 className='text-gray-500 inline-flex'>The creator has already withdrawn the money:<p className='text-black ml-2'>{yaRetiro === true ? 'True': 'False'}</p></h1><br/>
          <h1 className='text-gray-500 inline-flex'>Contract balance:<p className='text-black ml-2'>${balance.toLocaleString()} USD</p></h1><br/>
          <h1 className='text-gray-500 inline-flex'>Your investment with USDC or USDT:<p className='text-black ml-2'>{SIXinvertido}</p></h1><br/>
          <h1 className='text-gray-500 inline-flex'>Your investment with BUSD or DAI:<p className='text-black ml-2'>{DyochoInvertido}</p></h1><br/>
          { DyochoInvertido !== 0 ? <h1 className='text-gray-500 inline-flex'>Amount you will earn with BUSD or DAI:<p className='text-black ml-2'> {CuantoGanaraDyOcho}</p></h1> : <></> }
          { SIXinvertido !== 0 ? <h1 className='text-gray-500 inline-flex'>Amount you will earn with USDC or USDT:<p className='text-black ml-2'> {CuantoGanaraSIX}</p></h1> : <></> }
          { YaSacoDyOcho === true || YaSacoSIX === true ? 
          <h1 className='text-gray-500'>You have already withdrawn your investment:<p className='text-black ml-2 inline-flex'> True</p></h1> 
          : 
          <></>
          }
          {YALIQUIDO === true ? <p className='text-black'>The creator has already liquidated the contract</p> : <></> }
          <br></br>
          {/* AQUI VA EL VALIDADOR DEL ADDRESS */}
          <div className='py-3'>
          {datos[0].creatorAddress === account && LoCreo === true ? <Link to='/creator' state={datos} className='boton-connect'>Go to Dashboard</Link>: <></>}
          </div>
        </>
      )
    } else if(DataContract === false) {
        const llamar = () => {
          if (typeof window.ethereum !== "undefined") {
            GetSigner()
          } else {
            alert('Please install metamask to see the information of the contract')
          }
        }
      return(
        <>
          <button className='rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' onClick={llamar}>Get contract information</button>
        </>
      )
    }
  }

  // ---------------------------------------------------------  VIEW FUNCTIONS
  const GetSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    IsCreator(signer)
    const contrato = new ethers.Contract(datos[0].contractAddress, abiCreador, signer)
    try {
      const sixContractBalance = await contrato.sixContractBalance()
      const DyOchoContractBalance = await contrato.DyOchoContractBalance()
      const YaSacoElDinero = await contrato.YaSacoElDinero()
      const SIXverCuantoInvertiste = await contrato.SIXverCuantoInvertiste()
      const DyOchoverCuantoInvertiste = await contrato.DyOchoverCuantoInvertiste()
      // -------------------- SIX
      const verCuantoTeGanarasSix = await contrato.verCuantoTeGanarasSix()
      const stringNumberSIX = verCuantoTeGanarasSix.toString();
      const last6Digits = stringNumberSIX.slice(-6);
      const last6DigitsAreAllZeros = last6Digits.split('').every(digit => digit === '0');
      if (last6DigitsAreAllZeros) {  
        let result = stringNumberSIX.slice(0, -6);
        setCuantoGanaraSIX(result)
      } else {
        let result = stringNumberSIX.slice(0, -6) + '.' + last6Digits.replace(/0+$/, '');
        setCuantoGanaraSIX(result)
      }
      // -------------------- SIX

      // -------------------- D_Y_OCHO
      const verCuantoTeGanarasDyOcho = await contrato.verCuantoTeGanarasDyOcho()
      const stringNumberDyOcho = verCuantoTeGanarasDyOcho.toString();
      const last18Digits = stringNumberDyOcho.slice(-18);
      const last18DigitsAreAllZeros = last18Digits.split('').every(digit => digit === '0'); // Check if the last 18 digits are all zeros
      if (last18DigitsAreAllZeros) {  // Remove the last 18 digits if they're all zeros
        let result = stringNumberDyOcho.slice(0, -18);
        setCuantoGanaraDyOcho(result)
      } else {
        let result = stringNumberDyOcho.slice(0, -18) + '.' + last18Digits.replace(/0+$/, '');
        setCuantoGanaraDyOcho(result)
      }
      // -------------------- D_Y_OCHO

      if (verCuantoTeGanarasDyOcho.toString() !== '0') {
        const YaSacasteTuRendimientoDyOcho = await contrato.YaSacasteTuRendimientoDyOcho()
        setYaSacoDyOcho(YaSacasteTuRendimientoDyOcho)
      } else if(verCuantoTeGanarasSix.toString() !== '0') {
        const YaSacasteTuRendimientoSix = await contrato.YaSacasteTuRendimientoSix()
        setYaSacoSIX(YaSacasteTuRendimientoSix)
      }
      if(YaSacoElDinero === true) {
        const yaLiquido = await contrato.yaLiquido()
        setYaLiquido(yaLiquido)
      }
      const SIXbalance = sixContractBalance.toString()
      const DyOchoBalance = DyOchoContractBalance.toString()
      const DyochoAmount = DyOchoverCuantoInvertiste.toString()
      const SIXAmount = SIXverCuantoInvertiste.toString()
      const DyochoInvertido = Number(DyochoAmount.slice(0, -18));
      const balanceDyOcho = Number(DyOchoBalance.slice(0, -18));
      const SIXinvertido = Number(SIXAmount.slice(0, -6));
      const balanceSIX = Number(SIXbalance.slice(0, -6));
      setYaRetiro(YaSacoElDinero)
      setBlance(balanceDyOcho + balanceSIX)
      setDyochoInvertido(DyochoInvertido)
      setSIXinvertido(SIXinvertido)
      setDataContract(true)
    } catch (error) {
      console.log(error)
    }
  }
  const IsCreator = async (signer) => {
    const contrato = new ethers.Contract(TMISAddress, abiTMIS, signer)
    try {
      const BuscarContrato = await contrato.buscarCONTRATO(account)
      if(datos[0].contractAddress === BuscarContrato) {
        setLoCreo(true)
      } else {
        setLoCreo(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      if(isWeb3Enabled) {
        GetSigner()
      }
  },[account])

  useEffect(() =>{
    if(datos[0].network === 'Goerli') {
      setAbiCreador(ABI_TMIS_DESARROLLADOR_GO)
      setAbiTMIS(ABI_TMIS_GO)
      setTMISAddress(TMIS_ADDRESS)
    } else if (datos[0].network === 'Polygon') {
      setAbiCreador(ABI_TMIS_DESARROLLADOR_POLYGON)
      setAbiTMIS(ABI_TMIS_POLYGON)
      setTMISAddress(ADDRESS_TMIS_POLYGON)
    }
  },[datos])

  return (
    <div className="w-full px-2 pt-2 sm:px-32">
      <div className='pb-3'>
        <h1 className='text-gray-500 inline-flex'>Network:<p className='text-black ml-2'>{datos[0].network}</p></h1><br/>
        <Eterscan/>
        <h1 className='text-gray-500 inline-flex'>Tipe of round:<p className='text-black ml-2'>{datos[0].roundTipe}</p></h1><br/>
        <h1 className='text-gray-500 inline-flex'>Creation date:<p className='text-black ml-2'>{datos[0].creationDate}</p></h1><br/>
        <h1 className='text-gray-500 inline-flex'>Performance:<p className='text-black ml-2'>{datos[0].rendiiento}%</p></h1><br/>
        <h1 className='text-gray-500 inline-flex'>Target cuantity:<p className='text-black ml-2'>{(datos[0].targetCuantity).toLocaleString()}</p></h1><br/>
        {datos[0].ofice ? <><h1 className='text-gray-500 inline-flex'>Ofice:<a href={datos[0].ofice} rel='noreferrer' 
        target='_blank' className='text-black ml-2 no-underline hover:underline hover:text-sky-500'>Link ofice <ArrowTopRightOnSquareIcon width={15} height={15} 
        className='inline-flex mb-1'/></a></h1><br/></> : <div></div> }
        <ViewDatos/>
        {datos[0].network === 'Goerli' ? <GetTokens/> : <></>}
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2  text-black bg-gray-400 rounded-lg">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} >
              <ul>
                {posts.map((post) => (
                  <li key={post.id} className="rounded-md p-3 text-center" >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-black">
                      <li>{post.date}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <div className='py-5 '>
        {datos[0].linkTwitter ? <a href={datos[0].linkTwitter} rel='noreferrer' target='_blank' className='inline-flex'><BsTwitter/></a> : <div></div> }
        {datos[0].linkInstagram ? <a href={datos[0].linkInstagram} rel='noreferrer' target='_blank' className='inline-flex px-4'><RxInstagramLogo/></a> : <div></div> }
        {datos[0].email ? <a href={`mailto:${datos[0].email}`} rel='noreferrer' target='_blank' className='inline-flex'><HiOutlineMail/></a> : <div></div> }
        {datos[0].linkedin ? <a href={datos[0].linkedin} rel='noreferrer' target='_blank' className='inline-flex px-4'><BsLinkedin/></a> : <div></div> }
        {datos[0].webPage ? <a href={datos[0].webPage} rel='noreferrer' target='_blank' className='inline-flex'><MdWeb/></a> : <div></div> }
      </div>
      
    </div>
  )
}