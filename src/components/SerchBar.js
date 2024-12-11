import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar() {
  function Modal() {
    let [isOpen, setIsOpen] = useState(true);

    function closeModal() {
      setIsOpen(false);
    }

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
                        Contract address:{" "}
                        <p className="text-black">
                          {projectDetails.contractAddress}
                        </p>
                      </h1>
                      <h1 className="text-sm text-gray-500">
                        Creator of the contract:{" "}
                        <p className="text-black">
                          {projectDetails.fullNameFounder}
                        </p>
                      </h1>
                      <h1 className="text-sm text-gray-500">
                        Network:{" "}
                        <p className="text-black">{projectDetails.network}</p>
                      </h1>
                    </div>

                    <div className="mt-4">
                      <Link
                        to="/contract"
                        state={projectDetails}
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
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
    );
  }

  const [contractFound, setContractFound] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    aboutProject: "",
    socialNetworks: [],
    mainImage: "",
    contractAddress: "",
    fullNameFounder: "",
    creationDate: "",
    backgroundImage: "",
    aboutFounder: "",
    network: "",
  });

  const buscar = (event) => {
    event.preventDefault();
    const address = event.target.contractToSearch.value;
    get_investment_round(address);
    event.target.reset();
  };

  const get_investment_round = async (contract) => {
    // Create a promise for the fetch operation
    const fetchContractPromise = fetch(
      `${process.env.REACT_APP_API_URL}${contract}`,
      {
        method: "GET",
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    });

    toast.promise(
      fetchContractPromise,
      {
        loading: "Searching for project details...",
        success: "Project details successfully founded!",
        error:
          "Contract not found. Please check the contract address and try again.",
      },
      {
        duration: 20000, // 20 seconds
        style: {
          minWidth: "250px",
          background: "#333",
          color: "#fff",
        },
      }
    );

    try {
      const data = await fetchContractPromise;
      const contractData = data[0];

      setProjectDetails({
        aboutProject: contractData.about_the_project,
        socialNetworks: contractData.social_networks,
        mainImage: contractData.main_image,
        contractAddress: contractData.contract_address,
        fullNameFounder: contractData.full_name_founder,
        creationDate: contractData.creation_date,
        backgroundImage: contractData.background_image,
        aboutFounder: contractData.about_the_founder,
        network: "testnet",
      });
      // rendiiento: infoContract.rendimiento,
      // targetCuantity: infoContract.cantidadObjetivo,
      setContractFound(true);
    } catch (error) {}
  };

  return (
    <div className="w-full">
      <div className="">
        <form onSubmit={(e) => buscar(e)} className="w-full">
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
      <div className="mt-1 flex px-14">{contractFound && <Modal />}</div>
      <Toaster />
    </div>
  );
}
