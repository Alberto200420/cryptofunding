import BotonCrearContrato from "./BotonCrear"
import SearchBar from "./SerchBar"
import ContractList from "./ContractList"
import Coins from "./Coins"

function Header() {

  return(
    <div className="mt-28">
      <main className="lg:px-16 px-6">

        <div className="space-y-8 place-items-center">
          <h2 className="text-4xl font-semibold sm:text-6xl text-center">
          Raise capital without the need of banks in stablecoins
          </h2>

          <Coins />

          <p className="lg:text-2xl text-base text-gray-600 text-center max-w-lg">
          Get funding from your community, you set the returns you want to give, you ask for the capital you want to raise
          </p>
        </div>
            
        <div className="">
          <h2 className="px-16 text-4xl font-semibold tracking-tight sm:text-5xl">
          Find a project and <br/>earn returns investing <br/>only in people that<br/> you trust
          </h2>
          <SearchBar/>
          <h5 className="pl-16 text-4xl font-semibold tracking-tight sm:text-5xl mt-7">
          Get easy capital with 1 <br/>click
          </h5>
          <BotonCrearContrato/>
        </div>
      
      </main>

      <ContractList/>
    </div>
  )
}

export default Header