import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { useEffect, useState } from "react"
  
export default function ContractList() {  
  
  const [ posts, setPost ] = useState([])
  const [ numPage, setNumPage ] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      var config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_API_URL}/polygon/public-contracts/?page=${numPage}`,
          headers: {}
      };
      try {
          const response = await axios(config);
          const infoContract = response.data.contracts;
          setPost(infoContract)
      } catch (error) {
          console.log(error);
      }
    };
    fetchData();
  },[numPage])

  const PreviusPages = (e) => {
    e.preventDefault()
    setNumPage(numPage - 1)
  }
  const nextPages = (e) => {
    e.preventDefault()
    setNumPage(numPage + 1)
  }
    
    return (
      <div className="bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="mx-auto lg:mx-12 max-w-lg divide-y-2 divide-gray-200 lg:max-w-full">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Recent contracts</h2>
          </div>
          <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post) => (
              <div key={post.contractAddress}>
                <div className="inline-block"> 
                  <div className="inline-block"> 
                    <p className='inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800'>Performance: {post.rendimiento} % </p>
                  </div>
                </div>
                <div className="mt-4 block">
                  <a className='text-black no-underline hover:underline hover:text-sky-500 inline-flex' href={`https://polygonscan.com/address/${post.contractAddress}`} rel='noreferrer' target='_blank'
                  >{post.contractAddress}<ArrowTopRightOnSquareIcon width={15} height={15} className='inline-flex mt-1 ml-1'/></a>
                  <p className=''>Target quantity: $ {(post.cantidadObjetivo).toLocaleString()} USD </p>
                  <p className="mt-3 text-base text-gray-500">{(post.terminosYcondiciones).slice(0 , 400)}......</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={post.imagenPersonal} alt="" />
                      <img className="h-10 w-10 rounded-full pt-4" src={post.logo} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {(post.trayectoria).slice(0 , 150)}...
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500 space-y-3">
                      <time dateTime={post.fechaDeCreacion}>{post.fechaDeCreacion}</time>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          <div className='pt-3' >
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            {numPage !== 1 ? <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={e=>PreviusPages(e)}>Previus contracts</button> : <spam></spam>}
            <div className="ml-4 mt-2 flex-shrink-0">
              <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={e=>nextPages(e)}>Next contracts</button>
            </div>
          </div>
          </div>
      </div>
    )
}