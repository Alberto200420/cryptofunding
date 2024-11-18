// import Header from "components/HomeHeader"
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { LiaWalletSolid } from "react-icons/lia";
import { ScaleIcon } from '@heroicons/react/20/solid'
import { useEffect } from "react"
import { useMoralis } from "react-moralis"

const solutions = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function Home() {

    const rea = async () => {
        const ret = await enableWeb3()
        if (typeof ret !== "undefined") {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
            }
        }
    }

    const { enableWeb3, isWeb3Enabled, account, Moralis, deactivateWeb3, chainId: chainIdHex } = useMoralis()

    // Conseguir la red donde esta conectada  
    const chainId = chainIdHex
    // console.log(`ChainId is ${chainId}`)
    
    useEffect(() => { if (!isWeb3Enabled && typeof window !== "undefined" && window.localStorage.getItem("connected")) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return(
        <div>
            {/* <Navbar/> */}
            <nav className="m-2 bg-white border-b fixed top-0 w-full z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                    {/* Left Side - Brand Logo */}
                        <div className="flex items-center">
                            <ScaleIcon width={45} height={50} className='inline-flex pr-2'/>
                        </div>

                        {/* Center - Dropdown */}
                        <Popover className="relative">
                            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold lg:text-base">
                            <span>About this project</span>
                            <ChevronDownIcon aria-hidden="true" className="w-6 h-6" />
                            </PopoverButton>

                            <PopoverPanel className="absolute left-1/2 z-10 mt-3 flex w-screen max-w-md -translate-x-1/2 px-4">
                            <div className="w-full flex-auto overflow-hidden rounded-3xl bg-white text-sm shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                {solutions.map((item) => (
                                    <div
                                    key={item.name}
                                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                                    >
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                        />
                                    </div>
                                    <div>
                                        <a href={item.href} className="font-semibold text-gray-900">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                    </div>
                                    </div>
                                ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                    >
                                    <item.icon
                                        aria-hidden="true"
                                        className="h-5 w-5 flex-none text-gray-400"
                                    />
                                    {item.name}
                                    </a>
                                ))}
                                </div>
                            </div>
                            </PopoverPanel>
                        </Popover>

                        {/* Right Side - Wallet Icon */}
                        { account 
                        ? 
                        <span className="lg:text-base text-sm font-medium">
                            {account.slice(0, 6) +"..." +account.slice(38, 42)}
                        </span>
                        : 
                        <button type='button' onClick={rea}>
                            <div className="flex space-x-2 items-center">
                                <LiaWalletSolid className="w-7 h-7" />
                                <span className="hidden sm:inline-block lg:text-base text-sm font-medium">Connect Wallet</span>
                            </div>
                        </button>
                        }
                    </div>
                </div>
            </nav>
            {/* <main>
                <Header/>
            </main> */}
        </div>
    )
}

export default Home