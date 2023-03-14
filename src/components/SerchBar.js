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
      console.log(privateData)
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
      console.log(publicData)
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
    GoerliSearch(address)
    event.target.reset()
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
      alert('Error 404 not contract found')
      console.log(error)
    });
  }

  return (
    <div>
      <div className="mt-8 flex px-14">
        <form className="flex flex-grow border-2 rounded-xl border-black" onSubmit={e=>buscar(e)}>
          <input type= 'text' name='contractToSearch' className="w-full text-center rounded-xl py-2 sm:text-sm" placeholder="Address" />
          <button type='submit' className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md"><MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" /></button>
        </form>
      </div>
      <div className="mt-1 flex px-14">
      { privateData ? <Modal/> : publicData ? <Modal/> : <div></div> }
      </div>
    </div>
  )
}