import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function SearchBar() {

  function Modal() {
    let [isOpen, setIsOpen] = useState(true)
  
    function closeModal() {
      setIsOpen(false)
    }

    if (modalData.status === 'private') {
      return (
        <>
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
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                      >
                        Contract found
                      </Dialog.Title>
                      <div className="mt-2">
                        <h1 className="text-sm text-gray-500">
                          Contract address: <p className='text-black'>{modalData.contrato}</p>
                        </h1>
                        <h1 className="text-sm text-gray-500">
                          Creator of the contract: <p className='text-black'>{modalData.creador}</p>
                        </h1>
                        <h1 className="text-sm text-gray-500">
                          Type of round: <p className='text-black'>{modalData.status}</p>
                        </h1>
                        <h1 className="text-sm text-gray-500">
                          Network: <p className='text-black'>{modalData.network}</p>
                        </h1>
                      </div>
    
                      <div className="mt-4">
                        <Link to='/private' state={privateData} className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                          Go to contract
                        </Link>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
    } else if(modalData.status === 'public') {
      return (
        <>
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
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                      >
                        Contract found
                      </Dialog.Title>
                      <div className="mt-2">
                        <h1 className="text-sm text-gray-500">
                          Contract address: <p className='text-black'>{modalData.contrato}</p>
                        </h1>
                        <h1 className="text-sm text-gray-500">
                          Creator of the contract: <p className='text-black'>{modalData.creador}</p>
                        </h1>
                        <h1 className="text-sm text-gray-500">
                          Type of round: <p className='text-black'>{modalData.status}</p>
                        </h1>
                        <h1 className="text-sm text-gray-500">
                          Network: <p className='text-black'>{modalData.network}</p>
                        </h1>
                      </div>
    
                      <div className="mt-4">
                        <Link to='/public' state={publicData} className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                          Go to contract
                        </Link>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
    }
  }

  const [privateData, setPrivateData] = useState(null)
  const [publicData, setPublicData] = useState(null)
  let [modalData, setModalData] = useState({ creador: '', contrato: '', status: '', network: '' })

  const buscar = event => {
    event.preventDefault()
    const address = event.target.contractToSearch.value;
    PolygonSearch(address)
    event.target.reset()
  }

  const PolygonSearch = (contract) => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/polygon/search?contract=${contract}`,
      headers: { }
    };
    axios(config)
    .then(function (response) {
      const infoContract = response.data.contrato
      let creador = infoContract.addressDelCreador
      let contrato = infoContract.contractAddress
      let status = infoContract.roundTipe
      let network = 'Polygon'
      setModalData({ creador, contrato, status, network })
      if (infoContract.roundTipe === 'private') {
        setPrivateData([{
          id: infoContract.id,
          network: network,
          roundTipe: infoContract.roundTipe,
          creatorAddress: infoContract.addressDelCreador,
          contractAddress: infoContract.contractAddress,
          termsAconditions: infoContract.terminosYcondiciones,
          creationDate: infoContract.fechaDeCreacion,
          targetCuantity: infoContract.cantidadObjetivo,
          rendiiento: infoContract.rendimiento
        }])
      } else if(infoContract.roundTipe === 'public') {
        setPublicData([{
          id: infoContract.id,
          network: network,
          roundTipe: infoContract.roundTipe,
          creatorAddress: infoContract.addressDelCreador,
          contractAddress: infoContract.contractAddress,
          termsAconditions: infoContract.terminosYcondiciones,
          creationDate: infoContract.fechaDeCreacion,
          rendiiento: infoContract.rendimiento,
          targetCuantity: infoContract.cantidadObjetivo,
          email: infoContract.correoElectronico,
          linkInstagram: infoContract.linkInstagram,
          webPage: infoContract.paginaWeb,
          linkTwitter: infoContract.linkTwitter,
          linkedin: infoContract.linkedin,
          ofice: infoContract.oficinas,
          personalFile: infoContract.imagenPersonal,
          logo: infoContract.logo,
          trayectory: infoContract.trayectoria
        }])
      }
    })
    .catch(function (error) {
      GoerliSearch(contract)
      console.log(error)
    });
  }
  
  const GoerliSearch = (contract) => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/goerli/search?contract=${contract}`,
      headers: { }
    };
    axios(config)
    .then(function (response) {
      const infoContract = response.data.contrato
      let creador = infoContract.addressDelCreador
      let contrato = infoContract.contractAddress
      let status = infoContract.roundTipe
      let network = 'Goerli'
      setModalData({ creador, contrato, status, network })
      if (infoContract.roundTipe === 'private') {
        setPrivateData([{
          id: infoContract.id,
          network: network,
          roundTipe: infoContract.roundTipe,
          creatorAddress: infoContract.addressDelCreador,
          contractAddress: infoContract.contractAddress,
          termsAconditions: infoContract.terminosYcondiciones,
          creationDate: infoContract.fechaDeCreacion,
          targetCuantity: infoContract.cantidadObjetivo,
          rendiiento: infoContract.rendimiento
        }])
      } else if(infoContract.roundTipe === 'public') {
        setPublicData([{
          id: infoContract.id,
          network: network,
          roundTipe: infoContract.roundTipe,
          creatorAddress: infoContract.addressDelCreador,
          contractAddress: infoContract.contractAddress,
          termsAconditions: infoContract.terminosYcondiciones,
          creationDate: infoContract.fechaDeCreacion,
          rendiiento: infoContract.rendimiento,
          targetCuantity: infoContract.cantidadObjetivo,
          email: infoContract.correoElectronico,
          linkInstagram: infoContract.linkInstagram,
          webPage: infoContract.paginaWeb,
          linkTwitter: infoContract.linkTwitter,
          linkedin: infoContract.linkedin,
          ofice: infoContract.oficinas,
          personalFile: infoContract.imagenPersonal,
          logo: infoContract.logo,
          trayectory: infoContract.trayectoria
        }])
      }
    })
    .catch(function (error) {
      console.log(error)
      alert('Error 404 not contract found')
    });
  }

  return (
    <div className="w-full">
      <div className="">
        <form onSubmit={e => buscar(e)} className="w-full">
          <div className="relative">
            <MagnifyingGlassIcon 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" 
              aria-hidden="true" 
            />
            <input
              type="text"
              name="contractToSearch"
              className="w-full py-4 pl-12 pr-16 text-base rounded-lg border border-gray-600 
                       focus:outline-none focus:border-black focus:ring-4 focus:ring-gray-100
                       shadow-sm hover:shadow-md transition-shadow duration-200"
              placeholder="Search wallet address"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium
                       hover:bg-blue-600 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="mt-1 flex px-14">
      { privateData ? <Modal/> : publicData ? <Modal/> : <div></div> }
      </div>
    </div>
  )
}