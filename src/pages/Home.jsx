import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import { FaGithub } from "react-icons/fa";
import { LiaWalletSolid } from "react-icons/lia";
import { ScaleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import BotonCrearContrato from "components/BotonCrear";
import SearchBar from "components/SerchBar";
import Coins from "components/Coins";
import Performace from "assets/img/performance.jpg";
import ContractList from "components/ContractList";

const solutions = [
  {
    name: "Source code",
    description: "View source code on Github",
    href: "https://github.com/Alberto200420/cryptofunding",
    icon: FaGithub,
  },
];
const callsToAction = [
  {
    name: "Mail contact",
    href: "mailto:albertog1meza@gmail.com?subject=Awesome%20Project&body=Hey%20man%2C%20I%20just%20saw%20your%20project%2C%20I%20think%20it%20is%20awesome!",
    icon: EnvelopeIcon,
  },
  {
    name: "Phone contact",
    href: "https://wa.me/524428968441?text=Hey%20man%2C%20I%20just%20saw%20your%20project%2C%20I%20think%20it%20is%20awesome!",
    icon: PhoneIcon,
  },
];

function Home() {
  const rea = async () => {
    const ret = await enableWeb3();
    if (typeof ret !== "undefined") {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("connected", "injected");
      }
    }
  };

  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    Moralis,
    deactivateWeb3,
    chainId: chainIdHex,
  } = useMoralis();

  // Conseguir la red donde esta conectada
  const chainId = chainIdHex;
  // console.log(`ChainId is ${chainId}`)

  useEffect(() => {
    if (
      !isWeb3Enabled &&
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((newAccount) => {
      if (newAccount == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <div>
      {/* <Navbar/> */}
      <nav className="bg-white border-b fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Brand Logo */}
            <div className="flex items-center">
              <ScaleIcon width={45} height={50} className="inline-flex pr-2" />
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
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
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
            {account ? (
              <span className="lg:text-base text-sm font-medium">
                {account.slice(0, 6) + "..." + account.slice(38, 42)}
              </span>
            ) : (
              <button type="button" onClick={rea}>
                <div className="flex space-x-2 items-center">
                  <LiaWalletSolid className="w-7 h-7" />
                  <span className="hidden sm:inline-block lg:text-base text-sm font-medium">
                    Connect Wallet
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* main content */}
      <div className="mt-28">
        <main className="lg:px-16 px-6">
          {/* Parent Flexbox */}
          <div className="lg:flex lg:space-x-16 lg:items-start">
            {/* Left Section */}
            <div className="space-y-8 lg:w-1/2 flex flex-col items-center ">
              <h1 className="text-4xl font-semibold sm:text-6xl text-center">
                Raise capital without the need of banks in stablecoins
              </h1>
              <Coins />
              <ol className="lg:text-2xl text-base text-gray-900 max-w-lg mx-auto lg:mx-0 list-none list-outside space-y-2">
                <li>1- Request the capital you want to raise</li>
                <li>2 - Set the returns you want to give</li>
                <li>3 - Get funding from your community</li>
              </ol>

              <BotonCrearContrato />
            </div>

            {/* Right Section */}
            <div className="space-y-8 lg:w-1/2 flex flex-col items-center">
              <h2 className="text-4xl font-semibold sm:text-6xl text-center">
                Find a project and make a profit by investing only in people you
                trust
              </h2>
              <ol className="lg:text-2xl text-base text-gray-900 w-full list-none list-outside space-y-2 text-center">
                <li>
                  1- Find the contract of the businessman you want to invest in
                </li>
                <li>
                  2 - Analyze the terms and conditions of the business you are
                  entering
                </li>
                <li>3 - Make a profit on your capital</li>
              </ol>

              <SearchBar />
            </div>
          </div>
        </main>

        {/* <ContractList/> */}

        {/* infoPageTailwind */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base/7 font-semibold text-blue-500">
              Visit the source code of the project
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              A new way to invest and raise capital
            </p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Generate profits
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                    <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                      <img
                        className="size-full object-cover object-top"
                        src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
              </div>
              <div className="relative max-lg:row-start-1">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Delivers the desired performance
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Create smart contracts where you collect the capital you
                      want at the interest rate you want at the time of your
                      preference.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2 p-3">
                    <img
                      className="w-full max-lg:max-w-xs rounded-md"
                      src={Performace}
                      alt="Delivers the desired performance"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
              </div>
              <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                <div className="absolute inset-px rounded-lg bg-white"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Security
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Investments stored and recorded on the blockchain. Capital
                      managed by prestigious businessmen.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                    <img
                      className="h-[min(152px,40cqw)] object-cover"
                      src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
              </div>
              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      No trust?, no problem
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Check out our project source code, it is open to the
                      public and audited
                    </p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow">
                    <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            TMIS.sol
                          </div>
                          <div className="border-r border-gray-600/10 px-4 py-2">
                            App.jsx
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-14 pt-6">
                        <p className="text-green-500">
                          // SPDX-License-Identifier: BSL-1.0
                        </p>
                        <br />
                        <p className="text-blue-900">
                          pragma solidity{" "}
                          <span className="text-green-300">^0.8.0;</span>
                        </p>
                        <br />
                        <p className="text-blue-900">
                          import{" "}
                          <span className="text-orange-500">
                            "@openzeppelin/contracts/utils/math/SafeMath.sol";
                          </span>
                        </p>{" "}
                        <br /> <br />
                        <p className="text-blue-900">
                          contract{" "}
                          <span className="text-white">TMIS{" { "}</span>
                        </p>
                        <div className="pl-8">
                          <p className="text-pink-700">constructor ( ) {"{"}</p>
                          <p className="text-white pl-8">
                            creador = msg.sender;
                          </p>
                          <p className="text-pink-700">{"}"}</p>
                          <br />
                          <p className="text-blue-900">
                            uint8{" "}
                            <span className="text-green-300">private</span>{" "}
                            <span className="text-white">
                              SePuedeCrear = 0;
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
