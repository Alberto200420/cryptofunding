import BotonCrearContrato from "./BotonCrear"
import InforacionRapida from "./Casilla"
import SearchBar from "./SerchBar"

function Header() {
    return(
        <main className="flex flex-wrap justify-between sm:flex-nowrap">

          <div className="">
            <h2 className="px-16 text-4xl font-semibold tracking-tight sm:text-6xl">
            Levanta capital <br/>sin la necesidad <br/>de los bancos
            </h2>
            <h5 className="px-16 mt-4 text-2xl leading-8 text-gray-600">
            Apalancate de tu marca personal apoya <br/>a la comunidad a que te apoye <br/>financiando con monedas estables
            </h5>
            <InforacionRapida/>
          </div>
          
          <div className="">
            <h2 className="px-16 text-4xl font-semibold tracking-tight sm:text-5xl">
            Busca un proyecto <br/>y gana rendimientos <br/>invirtiendo solo en <br/>personas que confies
            </h2>
            <SearchBar/>
            <h5 className="pl-16 text-4xl font-semibold tracking-tight sm:text-5xl mt-7">
            Consigue capital facil<br/> con 1 click
            </h5>
            <BotonCrearContrato/>
          </div>
          
        </main>
    )
}

export default Header