import { Link } from 'react-router-dom'
import { HomeIcon } from "@heroicons/react/24/solid"

function TipsForInvesting() {
    return(
        <div className="mt-8">
            <Link to='/'>
                <HomeIcon className="h-9 w-9 ml-8" aria-hidden="true" />
            </Link>
            <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl">
                Tips para invertir en esta plataforma
            </h1>
            <div className="px-32 pt-3">
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    1- Invierte en personas que conozcas
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                    Siempre en esta plataforma sera recomendación invertir en personas en las que confiemos y no en compretos 
                    desconocidos.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    2- Investigar a fondo la oportunidad de inversión
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Antes de invertir, investiga a fondo la oportunidad de inversión y asegúrate de entender los detalles del proyecto.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    3- Verifica la viabilidad del proyecto
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Asegúrate de que el proyecto sea viable y tenga una buena estrategia de marketing y un plan sólido para alcanzar sus 
                objetivos, todo esto lo sabrás mediatne la información que este da a su comunidad.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    4- Conoce a la persona detrás del proyecto
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Es importante conocer a la persona o equipo detrás del proyecto y su experiencia en el campo.<br/>
                Investiga su historial y reputación para evaluar si son confiables, todo esto gracias a que los sigues
                muy de cerca por redes sociales.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    5- Entiende los términos de la inversión
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Asegúrate de entender los términos de la inversión, incluyendo cualquier retorno potencial, plazos, y cualquier riesgo 
                asociado.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    6- Considera tus objetivos de inversión a largo plazo
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Piensa en tus objetivos de inversión a largo plazo y evalúa si esta inversión se ajusta a ellos.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    7- Diversifica tus inversiones
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                No inviertas todo tu dinero en una sola oportunidad de inversión, es importante diversificar tus 
                inversiones para minimizar el riesgo, ya sea en T-mis o en otro lugar, lo importante 
                es que tengas opciones y portunidades para invertir. 
                </p>
            </div>
            <div className="my-4">
                <p className=" text-gray-400 text-center">&copy; 2023 T-mis Dapp. All rights reserved.</p>
            </div>
        </div>
    )
}

export default TipsForInvesting