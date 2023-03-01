import { Tab } from '@headlessui/react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InfoPrivateContract() {
  const location = useLocation()
  const datos = location.state;
  let [categories] = useState({
    Contract: [
      {
        id: datos[0].id,
        title: datos[0].termsAconditions,
        date: datos[0].creationDate
      }
    ]
  })

  function Eterscan() {
    if(datos[0].network === 'Goerli') {
      return (
        <>
          <h1 className='text-gray-500 inline-flex' >Address of the creator:
          <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
          href={`https://goerli.etherscan.io/address/${datos[0].creatorAddress}`}
          rel='noreferrer' target='_blank'>{datos[0].creatorAddress}</a>
          </h1><br/>
          <h1 className='text-gray-500 inline-flex'>Contract address:
          <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
          href={`https://goerli.etherscan.io/address/${datos[0].contractAddress}`}
          rel='noreferrer' target='_blank'>{datos[0].contractAddress}</a>
          </h1><br/>
        </>
      )
    } else if (datos[0].network === 'Poligon') {
      <>
        <h1 className='text-gray-500 inline-flex' >Address of the creator:
        <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
        href={`https://polygonscan.com/address/${datos[0].creatorAddress}`}
        rel='noreferrer' target='_blank'>{datos[0].creatorAddress}</a>
        </h1><br/>
        <h1 className='text-gray-500 inline-flex'>Contract address:
        <a className='text-black ml-2 no-underline hover:underline hover:text-sky-500' 
        href={`https://polygonscan.com/address/${datos[0].contractAddress}`}
        rel='noreferrer' target='_blank'>{datos[0].contractAddress}</a>
        </h1><br/>
      </>
    }
  }

  return (
    <div className="w-full px-2 py-2 sm:px-32">
      <div className='pb-3'>
        <h1 className='text-gray-500 inline-flex'>Network:<p className='text-black ml-2'>{datos[0].network}</p></h1><br/>
        <Eterscan/>
        <h1 className='text-gray-500 inline-flex'>Creation date:<p className='text-black ml-2'>{datos[0].creationDate}</p></h1><br/>
        <h1 className='text-gray-500 inline-flex'>Tipe of round:<p className='text-black ml-2'>{datos[0].roundTipe}</p></h1><br/>
        <h1 className='text-gray-500 inline-flex'>Performance:<p className='text-black ml-2'>{datos[0].rendiiento}%</p></h1><br/>
        <h1 className='text-gray-500 inline-flex'>Target cuantity:<p className='text-black ml-2'>{datos[0].targetCuantity}</p></h1><br/>
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
      
    </div>
  )
}
