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
import { useState } from "react";

function PublicPage() {
  const [activeTab, setActiveTab] = useState("Contract");

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
          <div
            className="bg-gray-300 h-36 w-full"
            style={{
              backgroundImage: datos.backgroundImage
                ? `url(${datos.backgroundImage})`
                : undefined,
              backgroundSize: "cover",
            }}
          ></div>

          {/* <!-- Profile Section --> */}
          <div className="relative -mt-16 flex flex-col items-center">
            {/* <!-- Main Image --> */}
            <div className="w-32 h-32 bg-gray-400 rounded-full border-4 border-white overflow-hidden">
              {datos.mainImage ? (
                <img
                  src={datos.mainImage}
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            {/* <!-- Name --> */}
            <h2 className="text-xl font-semibold mt-4">
              {datos.fullNameFounder}
            </h2>

            {/* <!-- Social Icons --> */}
            <div className="flex space-x-4 mt-2">
              {datos.socialNetworks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.includes("linkedin") && (
                    <FaLinkedin className="text-[#0800FA] text-2xl cursor-pointer" />
                  )}
                  {link.includes("instagram") && (
                    <FaInstagram className="text-[#F205E2] text-2xl cursor-pointer" />
                  )}
                  {link.includes("telegram") && (
                    <FaTelegramPlane className="text-[#00AEED] text-2xl cursor-pointer" />
                  )}
                  {link.includes("x.com") && (
                    <FaXTwitter className="text-2xl cursor-pointer" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:px-12 px-4">
            {/* <!-- Project Information --> */}
            <div className="mt-4">
              <div className="flex items-center space-x-2 text-sm">
                <Link to="/">
                  <FaHouse />
                </Link>
                <span>/ project /</span>
                <a
                  href={`https://etherscan.io/address/${datos.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
                {[
                  { label: "Contract", value: "Contract" },
                  { label: "About the Project", value: "AboutProject" },
                  { label: "About the Founder", value: "AboutFounder" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex-1 py-2 text-center ${
                      activeTab === tab.value
                        ? "border-b-2 border-[#6805F2] text-[#6805F2]"
                        : ""
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* <!-- Tab Content --> */}
              <div className="mt-4 text-sm text-gray-600">
                {activeTab === "Contract" && <p>Contract details go here...</p>}
                {activeTab === "AboutProject" && <p>{datos.aboutProject}</p>}
                {activeTab === "AboutFounder" && <p>{datos.aboutFounder}</p>}
              </div>
            </div>
            <BotonFirmar
              address={datos.contractAddress}
              network={datos.network}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default PublicPage;
