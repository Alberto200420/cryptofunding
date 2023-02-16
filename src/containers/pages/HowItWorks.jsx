import { HomeIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'
import HomeImage from 'assets/img/home.png'
import HomeNoAnonimus from 'assets/img/HomeNoneAnonimus.png'
import Coins from "components/Coins"

function ComoFunciona() {
    return(
        <div className="mt-8">
            <Link to='/'>
                <HomeIcon className="h-9 w-9 ml-8" aria-hidden="true" />
            </Link>
            <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl">
                ¿Como funciona T-mis? 
            </h1>
            <div className="px-32 pt-3">
                <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl pt-20">
                La creacion de proyectos anonimos <a className="text-gray-400 text-4xl" href="#ProyectosAnonimos" rel="tag">#</a>
                </h1>
                <img className="rounded-md mt-8" src={ HomeImage } alt="T-mis Home"/>
                <p className="mt-4 text-2xl leading-8 text-black">
                    Cuando quieres crear un proyecto nuevo te aparece esta parte de la pagina en el que 
                    te pide cierta informacion relevante, este contrato anonimo solo te pide 3 campos a llenar y son obligatorios 
                    tanto de la manera anonima como en la no anonima y no podras crear contratos sin llenar estos campos.<br/>
                    El primero nos pide que escribamos los terminos y condiciones del contrato, aquí es lo que pondrías en un contrato
                    de la vida real en el que le entregues a tus inversionistas toda la informacion al respecto.<br/>
                    Puedes poner lo que quíeras, pero como recomendacíon es hacerlo de la forma mas profecional, este contrato es anonimo 
                    y tu tendrás que compartir la url de tu contrato o la direccíon address para que tus inversionistas privados inviertan
                    en tu proyecto.<br/><br/>
                    El segundo campo es la cantidad objetivo que quieras obtener, aquí solo pondras la cantidad en $ USD y no en otra moneda,
                    la razón de esto es porque las inversiones son en monedas estables que van a la par del dolar americano (BUSD, USDT, USDC, 
                    DAI) <Coins/><br/><br/>
                    Ejemplo de como lo tienes que hacer en el caso de que quieras levantar Un millon de dolares: 1000000<br/>
                    Como puedes ver no tienes que poner puntos no tienes que poner comas y no tienes que poner decimales.<br/>
                    Ejemplo incorrecto: 1,000,000.00<br/><br/>
                    El tercer campo nos pide el porcentaje de inversion y solo puedes poner 2 numeros (ej. 10) este es el porcentaje de 
                    retorno de inversion que le darás a los inversinistas, puesto si alguien invierte en tu proyecto 1,000 USD, 
                    el inversionista recibirá como retorno el 10% de su inversion<br/> (1,000 + 10%) = 1,100 de retorno haciendo que gane 100 USD.
                    <br/><br/>El siguiente paso es oprimir el boton "Start investment round" este boton habrirá tu wallet de criptomonedas,
                    en este tienes que tener algo de <a className="text-gray-600 no-underline hover:underline hover:text-black" href="https://polygonscan.com/" target='_blank' 
                    rel="noreferrer" >MATIC que es la moneda nativa de poligon, </a>
                    esta es para pagar el gas de la transaccion.<br/>¡¡Listo!! ya tienes tu contrato con terminos y condiciones, cantidad objetivo 
                    y porcentaje de retorno de inversion, estas listo para compartir la URL o la direccion address.<br/><br/>
                </p>
                <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl pt-20">
                La creacion de proyectos no anonimos <a className="text-gray-400 text-4xl" href="#ProyectosNoAnonimos" target='_self' >#</a>
                </h1>
                <img className="rounded-md mt-8" src={ HomeNoAnonimus } alt="T-mis Home"/>
                <p className="mt-4 text-2xl leading-8 text-black">
                    Aquí habra tambien que llenar mas campos del formulario, estos no son campos obligatorios, puedes no llenar aluno de estos
                    campos y no pasará nada.<br/><br/>
                    Repasemos ramidamente los campos obligatorios:<br/>
                    1-(write a contract containing terms and conditions:) El primero nos pide que escribamos los terminos y condiciones 
                    del contrato, aquí es lo que pondrías en un contrato de la vida real en el que le entregues a tus inversionistas toda 
                    la informacion al respecto.<br/>
                    1-(write a contract containing terms and conditions:) El primero nos pide que escribamos los terminos y condiciones 
                    del contrato, aquí es lo que pondrías en un contrato de la vida real en el que le entregues a tus inversionistas toda 
                    la informacion al respecto.<br/>
                    2-(Target quantity:) El segundo campo es la cantidad objetivo que quieras obtener, 
                    aquí solo pondras la cantidad en $ USD y no en otra moneda, la razón de esto es porque las inversiones son en monedas 
                    estables que van a la par del dolar americano (BUSD, USDT, USDC, DAI) <Coins/><br/>
                    3-(Investment performance:) El tercer campo nos pide el porcentaje de inversion y solo puedes poner 2 numeros 
                    (ej. 10) este es el porcentaje de retorno de inversion que le darás a los inversinistas.<br/><br/>

                    Ahora bien aquí es meramente intuitivo te pide la URL de tus redes sociales como instagram y twiter, la URL de tu 
                    pagina web (en caso de tenerla, recuerda que no es un campo obligatorio), correo electronico, una introduccion de ti, 
                    de tu trayectoria y toda tu carrera profecional y la direccion de tus oficinas (en caso de tenerlas, 
                    recuerda que no es un campo obligatorio).<br/><br/>
                    El siguiente paso es oprimir el boton "Start investment round" este boton habrirá tu wallet de criptomonedas,
                    en este tienes que tener algo de <a className="text-gray-600" href="https://polygonscan.com/" target='_blank' 
                    rel="noreferrer">MATIC que es la moneda nativa 
                    de poligon, </a>esta es para pagar el gas de la transaccion.<br/>¡¡Listo!! ya tienes tu contrato con información 
                    mas completa como terminos y condiciones, cantidad objetivo, porcentaje de retorno de inversion, redes sociales,
                    sitio web, correo electronico, trayectoria, y direccion de oficinas ahora estas listo para compartir la URL o la 
                    direccion address.<br/><br/>
                </p>
            </div>
        </div>
    )
}

export default ComoFunciona