// import InfoSmartContract from "components/InfoContract";
import BotonFirmar from "components/BotonFirmar";
import { useLocation, Navigate } from "react-router-dom";
import {
  FaLinkedin,
  FaInstagram,
  FaTelegramPlane,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  FaMoneyBillTrendUp,
  FaHouse,
  FaLocationDot,
  FaXTwitter,
} from "react-icons/fa6";
import { MdWeb, MdDateRange } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { TbChartInfographic } from "react-icons/tb";
import { Link } from "react-router-dom";

function PublicPage() {
  const location = useLocation();
  const datos = location.state;
  if (!datos) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <main>
        <div>
          {/* <!-- Cover Image --> */}
          <div className="bg-gray-300 h-36 w-full"></div>

          {/* <!-- Profile Section --> */}
          <div className="relative -mt-16 flex flex-col items-center">
            {/* <!-- Main Image --> */}
            <div className="w-32 h-32 bg-gray-400 rounded-full border-4 border-white"></div>
            {/* <!-- Name --> */}
            <h2 className="text-xl font-semibold mt-4">
              {datos.fullNameFounder}
            </h2>

            {/* <!-- Social Icons --> */}
            <div className="flex space-x-4 mt-2">
              <FaLinkedin className="text-[#0800FA] text-2xl cursor-pointer" />
              <FaInstagram className="text-[#F205E2] text-2xl cursor-pointer" />
              <FaTelegramPlane className="text-[#00AEED] text-2xl cursor-pointer" />
              <FaXTwitter className="text-2xl cursor-pointer" />
              <MdWeb className="text-2xl cursor-pointer" />
              <FaLocationDot className="text-[#F23535] text-2xl cursor-pointer" />
            </div>
          </div>

          <div className="lg:px-12 px-4">
            {/* <!-- Project Information --> */}
            <div className="mt-4">
              {/* <!-- Project Details --> */}
              <div className="flex items-center space-x-2 text-sm">
                <Link to={"/"}>
                  <FaHouse />
                </Link>
                <span>/ project /</span>
                <a
                  href="#"
                  className="text-[#6805F2] flex items-center space-x-1"
                >
                  <span>{datos.contractAddress}</span>
                  <FaExternalLinkAlt />
                </a>
              </div>
            </div>

            {/* <!-- Tabs Section --> */}
            <div className="mt-6">
              {/* <!-- Financial Details --> */}
              <div className="mb-4 flex justify-between items-center text-lg">
                <div className="flex items-center space-x-2">
                  <GoGoal className="text-[#F00801]" />
                  <span className="text-lg font-medium">$ 3,000,000.00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMoneyBillTrendUp className="text-[#00F034]" />
                  <span className="text-lg font-medium">$ 1,587,912.00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TbChartInfographic className="text-[#00F034]" />
                  <span className="text-lg font-medium">25%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdDateRange />
                  <span className="text-lg font-medium">
                    {datos.creationDate}
                  </span>
                </div>
              </div>

              <div className="flex border-b">
                <button className="flex-1 py-2 text-center border-b-2 border-[#6805F2]">
                  Contract
                </button>
                <button className="flex-1 py-2 text-center">
                  About the Project
                </button>
                <button className="flex-1 py-2 text-center">
                  About the Founder
                </button>
              </div>

              {/* <!-- Tab Content --> */}
              <div className="mt-4 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                dapibus sapien. Vestibulum pellentesque...
              </div>
            </div>
            <BotonFirmar
              address={datos.contractAddress}
              network={datos.network}
            />
          </div>
        </div>
        {/* <InfoSmartContract /> */}
      </main>
    </div>
  );
}

export default PublicPage;
