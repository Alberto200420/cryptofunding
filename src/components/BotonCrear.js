import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Switch } from '@headlessui/react'

export default function BotonCrearContrato() {
  let [isOpen, setIsOpen] = useState(false)

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

  // const [enabled, setEnabled] = useState(null)
  const [enabled, setEnabled] = useState({
    paginaWeb: "",
    instagram: "",
    twitter: "",
    email: "",
    trayectory: "",
    oficinas: ""
  })

  const { terminos_Y_condiciones, cantidad_Objetivo_USD, rendimiento } = formData
  const { paginaWeb, instagram, twitter, email, trayectory, oficinas } = enabled


  const enCambio = e => setEnabled({ ...enabled, [e.target.name]: e.target.value })
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit =(e)=> {
    e.preventDefault();
    console.log(terminos_Y_condiciones, cantidad_Objetivo_USD, rendimiento)
    if(enabled !== 'undefined') {
      console.log(instagram, paginaWeb, twitter, email, trayectory, oficinas)
    }
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
                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <div className='mt-4'>

                  <form onSubmit={e=>onSubmit(e)}>
                      <label className='text-xl' htmlFor="fname"><h2>Write a contract containing terms and conditions:</h2></label>
                      <textarea  type="text" className='border-2 border-black rounded-lg w-full resize-none outline-none h-72' name="terminos_Y_condiciones" onChange={e=>onChange(e)} required/><br/>
                      <label className='text-xl' htmlFor="lname"><h5>Target quantity:</h5></label>
                      <input type="text" className='border-2 border-black rounded-lg outline-none text-center w-3/4 py-1.5 ' 
                      name="cantidad_Objetivo_USD" onChange={e=>onChange(e)} placeholder='1,000,000.00 $USD' required/><br/><br/>
                      <label className='text-xl' htmlFor="lname"><h5>Investment performance %:</h5></label>
                      <input type="text" className='border-2 border-black rounded-md outline-none text-center w-3/4 py-1.5 ' 
                      name="rendimiento" onChange={e=>onChange(e)} placeholder='E.G: 25' maxLength='2' required/><br/>

                      <div className="inline-flex py-4">
                        <label className='text-xl px-6' htmlFor="lname"><h5>Anonimous</h5></label>
                        <Switch checked={enabled} onChange={setEnabled}
                            className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
                            inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                            <span aria-hidden="true" className={`${enabled ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch>
                      </div> 
                        {
                          enabled ? 
                          <div>
                            <input type='url' className='border-2 border-gray-300 rounded-lg w-3/4 py-1.5 outline-none text-center' placeholder='Instagram' name='instagram' onChange={e=>enCambio(e)} /><br/><br/>
                            <input type='url' className='border-2 border-gray-300 rounded-lg w-3/4 py-1.5 outline-none text-center' placeholder='Pagina web' name='paginaWeb' onChange={e=>enCambio(e)} /><br/><br/>
                            <input type='url' className='border-2 border-gray-300 rounded-lg w-3/4 py-1.5 outline-none text-center' placeholder='Twitter' name='twitter' onChange={e=>enCambio(e)} /><br/><br/>
                            <input type='email' className='border-2 border-gray-300 rounded-lg w-3/4 py-1.5 outline-none text-center' placeholder='Email' name='email' onChange={e=>enCambio(e)} /><br/><br/>
                            <textarea type="text" className='border-2 border-gray-300 rounded-lg w-3/4 resize-none outline-none h-52 text-center'  placeholder='Cuentanos tu trayectoria' name="trayectory" onChange={e=>enCambio(e)} /><br/><br/>
                            <input  className='border-2 border-gray-300 rounded-lg w-3/4 py-1.5 outline-none text-center' placeholder='Oficinas' name='oficinas' onChange={e=>enCambio(e)} /><br/><br/>
                          </div> : <div></div>
                        }
                       

                      <label className="text-sm ml-3 font-medium text-gray-400">Before to start the investment round you must read <a href='/howItWorks' target="_blank" className='text-git-color'>how T-mis work</a></label>
                      
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
    </div>
  )
}
