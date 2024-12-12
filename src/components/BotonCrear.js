import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useMoralis } from "react-moralis";
import { TMIS_ADDRESS, ABI_TMIS_GO } from "abi/TMIS_GO_TEST";
import { ADDRESS_TMIS_POLYGON, ABI_TMIS_POLYGON } from "abi/Polygon_ABI";
import { ethers } from "ethers";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import ModalSuccess from "./ModalSuccess";

export default function BotonCrearContrato() {
  let [isOpen, setIsOpen] = useState(false);
  const { chainId: chainIdHex } = useMoralis();
  const chainId = chainIdHex;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // --------------------------------------------------------   Funciones
  const [formData, setFormData] = useState({
    terminos_Y_condiciones: "",
    cantidad_Objetivo_USD: 0,
    rendimiento: 0,
    paginaWeb: "",
    instagram: "",
    linkedin: "",
    x: "",
    fotoPersonal: null,
    logo: null,
    trayectory: "",
    office: "",
  });

  const [previewImage1, setPreviweImage1] = useState();
  const [previewImage2, setPreviweImage2] = useState();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event) => {
      setPreviweImage1(reader.result);
    };
  };

  const handleFile2Change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event) => {
      setPreviweImage2(reader.result);
    };
  };

  //------------------------------------------------ FUNCTIONS GOELRI
  const [cargandoData, setCargandoData] = useState(false);
  const [dataCargada, setDataCarga] = useState(false);
  const [contractData, setContractData] = useState({
    hash: "",
    address_del_creador: "",
    address_del_contrato: "",
    network: "",
  });

  function ModalContractInfo() {
    let [isOpen, setIsOpen] = useState(true);

    function closeInfoModal() {
      setIsOpen(false);
    }

    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeInfoModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                  <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {contractData.network === "Goerli" ? (
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                          Contract created in Goerli
                        </Dialog.Title>

                        <div className="mt-2">
                          <h1 className="text-sm text-gray-500">
                            Contract address: <br />
                            <a
                              href={`https://goerli.etherscan.io/address/${contractData.address_del_contrato}`}
                              rel="noreferrer"
                              target="_blank"
                              className="text-black no-underline hover:underline hover:text-sky-500"
                            >
                              {contractData.address_del_contrato}{" "}
                              <ArrowTopRightOnSquareIcon
                                width={15}
                                height={15}
                                className="inline-flex mb-1"
                              />
                            </a>
                          </h1>
                          <h1 className="text-sm text-gray-500 pt-2">
                            Creator of the contract:{" "}
                            <p className="text-black">
                              {contractData.address_del_creador}
                            </p>
                          </h1>
                          <h1 className="text-sm text-gray-500 py-2">
                            Transaction hash: <br />
                            <a
                              href={`https://goerli.etherscan.io/tx/${contractData.hash}`}
                              rel="noreferrer"
                              target="_blank"
                              className="text-black no-underline hover:underline hover:text-sky-500"
                            >
                              {contractData.hash}{" "}
                              <ArrowTopRightOnSquareIcon
                                width={15}
                                height={15}
                                className="inline-flex mb-1"
                              />
                            </a>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Network deployed:{" "}
                            <p className="text-black">{contractData.network}</p>
                          </h1>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeInfoModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </div>
                    ) : contractData.network === "Polygon" ? (
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                          Contract created
                        </Dialog.Title>
                        <div className="mt-2">
                          <h1 className="text-sm text-gray-500">
                            Contract address: <br />
                            <a
                              href={`https://polygonscan.com/address/${contractData.address_del_contrato}`}
                              rel="noreferrer"
                              target="_blank"
                              className="text-black no-underline hover:underline hover:text-sky-500"
                            >
                              {contractData.address_del_contrato}{" "}
                              <ArrowTopRightOnSquareIcon
                                width={15}
                                height={15}
                                className="inline-flex mb-1"
                              />
                            </a>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Creator of the contract:{" "}
                            <p className="text-black">
                              {contractData.address_del_creador}
                            </p>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Transaction hash:{" "}
                            <a
                              href={`https://polygonscan.com/tx/${contractData.hash}`}
                              rel="noreferrer"
                              target="_blank"
                              className="text-black no-underline hover:underline hover:text-sky-500"
                            >
                              {contractData.hash}{" "}
                              <ArrowTopRightOnSquareIcon
                                width={15}
                                height={15}
                                className="inline-flex mb-1"
                              />
                            </a>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Network deployed:{" "}
                            <p className="text-black">{contractData.network}</p>
                          </h1>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeInfoModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                          Mining
                        </Dialog.Title>
                        <div className="mt-2">
                          <h1 className="text-sm text-gray-500">
                            Contract address: <br />
                            <div className="animate-pulse flex space-x-4">
                              <div className="flex-1 space-y-4 py-1">
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                              </div>
                            </div>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Creator of the contract: <br />
                            <div className="animate-pulse flex space-x-4">
                              <div className="flex-1 space-y-4 py-1">
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                              </div>
                            </div>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Transaction hash: <br />
                            <div className="animate-pulse flex space-x-4">
                              <div className="flex-1 space-y-4 py-1">
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                              </div>
                            </div>
                          </h1>
                          <h1 className="text-sm text-gray-500">
                            Network deployed: <br />
                            <div className="animate-pulse flex space-x-4">
                              <div className="flex-1 space-y-4 py-1">
                                <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                              </div>
                            </div>
                          </h1>
                        </div>
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  //------------------------------------------------ FUNCTIONS GOELRI

  const onSubmit = async (e) => {
    e.preventDefault();
    const DyOchoDinero =
      formData.cantidad_Objetivo_USD / 2 + "000000000000000000";
    const SIXdinero = formData.cantidad_Objetivo_USD / 2 + "000000";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    try {
      const contract = new ethers.Contract(TMIS_ADDRESS, ABI_TMIS_GO, signer);
      closeModal();
      // Call the contract function and get the transaction hash
      const tx = await contract.crearContrato(
        formData.terminos_Y_condiciones,
        DyOchoDinero,
        SIXdinero,
        formData.rendimiento
      );
      setCargandoData(true);
      await tx.wait();
      // Get the contract function result
      const contractAddress = await contract.buscarCONTRATO(address[0]);
      // OBTENIENDO CONTRATO
      setContractData({
        hash: tx.hash,
        address_del_creador: address[0],
        address_del_contrato: contractAddress,
        network: "Goerli",
      });
      sendData();
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };

  const sendData = (creatorAddress, contractAddress) => {
    const formularioDATA = new FormData();
    formularioDATA.append("creatorAddress", creatorAddress);
    formularioDATA.append("contract_address", contractAddress);
    formularioDATA.append("rendimiento", formData.rendimiento);
    formularioDATA.append("linkInstagram", formData.instagram);
    formularioDATA.append("webPage", formData.paginaWeb);
    formularioDATA.append("linkTwitter", formData.x);
    formularioDATA.append("linkedin", formData.linkedin);
    formularioDATA.append("ofice", formData.office);
    formularioDATA.append("main_image", formData.fotoPersonal);
    formularioDATA.append("background_image", formData.logo);
    formularioDATA.append("about_the_founder", formData.trayectory);
    // sendPublic(formularioDATA);
    setDataCarga(true);
  };
  // --------------------------------------------------------   Funciones

  return (
    <>
      <div className="w-full">
        <button
          type="button"
          onClick={openModal}
          className="w-full rounded-lg p-3 px-8 text-2xl"
          style={{
            background:
              "linear-gradient(-45deg, #ddd013, #e61414, #261ad3, #13bb13)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            color: "#fff",
          }}
        >
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
            <div className="fixed inset-0 bg-black bg-opacity-60" />
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-xl transition-all">
                  <h2 className="text-2xl font-bold text-center">
                    Create Your Investment Contract
                  </h2>
                  <form onSubmit={onSubmit} className="mt-6 space-y-6">
                    {/* Terms and Conditions */}
                    <div>
                      <label className="block text-lg font-[450]">
                        Contract Terms & Conditions
                      </label>
                      <textarea
                        name="terminos_Y_condiciones"
                        className="w-full mt-2 p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none resize-none h-40"
                        placeholder="Write your contract terms and conditions..."
                        onChange={onChange}
                        required
                      />
                    </div>

                    {/* Target Quantity */}
                    <div>
                      <label className="block text-lg font-[450]">
                        Target Quantity (USD)
                      </label>
                      <input
                        type="number"
                        name="cantidad_Objetivo_USD"
                        className="w-full mt-2 p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                        placeholder="e.g., 1000000 = $1,000,000.00"
                        onChange={onChange}
                        required
                      />
                    </div>

                    {/* Investment Performance */}
                    <div>
                      <label className="block text-lg font-[450]">
                        Investment Performance (%)
                      </label>
                      <input
                        type="number"
                        name="rendimiento"
                        className="w-full mt-2 p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                        placeholder="e.g., 25"
                        maxLength="2"
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Your LinkedIn (URL)
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          placeholder="Optional"
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                          onChange={onChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Your Instagram (URL)
                        </label>
                        <input
                          type="url"
                          name="instagram"
                          placeholder="Optional"
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                          onChange={onChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Your Telegram channel (URL)
                        </label>
                        <input
                          type="url"
                          name="telegram"
                          placeholder="Optional"
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                          onChange={onChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Your X social (URL)
                        </label>
                        <input
                          type="url"
                          name="x"
                          placeholder="Optional"
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                          onChange={onChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Your website (URL)
                        </label>
                        <input
                          type="url"
                          name="paginaWeb"
                          placeholder="Optional"
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                          onChange={onChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Your office address (URL)
                        </label>
                        <input
                          type="url"
                          name="office"
                          placeholder="Optional"
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none"
                          onChange={onChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Tell us about your trajectory
                        </label>
                        <textarea
                          name="trayectory"
                          placeholder="Be clear and engaging for investors, this content will be displayed in your publication."
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none resize-none h-32"
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-lg font-[450]">
                          Tell us about your project
                        </label>
                        <textarea
                          name="about_the_project"
                          placeholder="Be clear and engaging for investors, this content will be displayed in your publication."
                          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:ring-2 focus:ring-gray-100 focus:border-black focus:outline-none resize-none h-32"
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-[450]">
                          Personal Photo
                        </label>
                        <input
                          type="file"
                          name="fotoPersonal"
                          onChange={handleFileChange}
                          required
                          className="block w-full mt-2 file:border-none file:rounded-lg file:bg-[#0800FA] file:text-white file:px-4 file:py-2 file:cursor-pointer"
                        />
                        {previewImage1 && (
                          <img
                            src={previewImage1}
                            alt="Raise capital without the need of banks in stablecoins"
                            className="mt-2 rounded-lg w-24"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-lg font-[450]">
                          Personal Photo
                        </label>
                        <input
                          type="file"
                          name="logo"
                          onChange={handleFile2Change}
                          required
                          className="block w-full mt-2 file:border-none file:rounded-lg file:bg-[#0800FA] file:text-white file:px-4 file:py-2 file:cursor-pointer"
                        />
                        {previewImage2 && (
                          <img
                            src={previewImage2}
                            alt="Raise capital without the need of banks in stablecoins"
                            className="mt-2 rounded-lg w-24"
                          />
                        )}
                      </div>
                    </div>

                    {/* How It Works Link */}
                    <p className="text-sm text-gray-500">
                      Before starting the investment round, please read{" "}
                      <a
                        href="/how-it-works"
                        target="_blank"
                        className="text-[#e61414] hover:underline"
                      >
                        how T-mis works
                      </a>
                    </p>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full p-3 mt-4 text-white bg-gradient-to-r from-[#ddd013] via-[#e61414] to-[#261ad3] rounded-lg shadow-md hover:opacity-90 transition-all"
                    >
                      Start Investment Round
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {cargandoData === true ? <ModalContractInfo /> : <div></div>}
      {dataCargada === true ? (
        <ModalSuccess mensaje={"Contract successfully saved in the database"} />
      ) : (
        <div></div>
      )}
    </>
  );
}
