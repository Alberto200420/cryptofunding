import BotonCrearContrato from "./BotonCrear"
import InforacionRapida from "./Casilla"
import SearchBar from "./SerchBar"
import ContractList from "./ContractList"

function Header() {

  return(
    <div>
      <main className="flex flex-wrap justify-between sm:flex-nowrap">

        <div className="">
          <h2 className="px-16 text-4xl font-semibold tracking-tight sm:text-6xl">
          Raise capital <br/>without the need <br/>for banks
          </h2>
          <h5 className="px-16 mt-4 text-2xl leading-8 text-gray-600">
          Leverage your personal brand support <br/>the community to support you <br/>funding with stablecoins
          </h5>
          <InforacionRapida/>
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