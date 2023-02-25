import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
// import { Link } from 'react-router-dom'
import axios from 'axios'

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
    const ronda = JSON.stringify(response.data.contrato.roundTipe)
    if (ronda === '"private"') {
      console.log(`Esta ronda es privada ${ronda}`)
      console.log(JSON.stringify(response.data.contrato.id))
      console.log(JSON.stringify(response.data.contrato.creatorAddress))
    } else if(ronda === '"public"') {
      console.log(`Esta ronda es publica ${ronda}`)
      console.log(JSON.stringify(response.data.contrato.id))
      console.log(JSON.stringify(response.data.contrato.creatorAddress))
    }
  })
  .catch(function (error) {
    console.log(error)
  });
}

export default function SearchBar() {
  return (
      <div className="mt-8 flex px-14">
        <form className="relative flex flex-grow border-2 rounded-xl border-black" onSubmit={e=>buscar(e)}>
          <input type= 'text' name='contractToSearch' className="w-full text-center rounded-xl py-2 sm:text-sm" placeholder="Address" />
          <button type='submit' className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md"><MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" /></button>
        </form>
        {/* <Link
          to='/x0123'
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md">
          <MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" />
        </Link> */}
      </div>
  )
}