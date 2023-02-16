import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export default function SearchBar() {
  return (
      <div className="mt-8 flex px-14">
        <div className="relative flex flex-grow border-2 rounded-xl border-black">
          <input type= 'text' className="w-full text-center rounded-xl py-2 sm:text-sm" placeholder="Address" />
        </div>
        <Link
          to='/x0123'
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md">
          <MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" />
        </Link>
      </div>
  )
}