import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Redes from "components/social"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InfoSmartContract() {
  let [categories] = useState({
    Contract: [
      {
        id: 1,
        title: <p>CLÁUSULAS
        Primera. – Objeto del contrato.
        Por medio del presente contrato la prestadora otorga a la deudora, por concepto de préstamo,
        la cantidad de $598,000 (QUINIENTOS NOVENTA Y OCHO mil pesos 00/100 M.N.),
        cantidad que será destinada a actos de desarrollo inmobiliario en Grupo BIRE Desarrollos y 
        que será transferida a la cuenta:
        x01h5s5vsf848s4b84sdf948sf4b84sS7L6HcSe
        Segunda. - Plazos
        Los plazos previstos en el presente contrato se computarán a partir del día siguiente en que
        la deudora reciba el capital.
        Tercera. – Pago del capital
        La deudora, se obliga a pagar a la prestadora una cantidad igual a la recibida, es decir
        $598,000.00 (QUINIENTOS NOVENTAY OCHO mil pesos 00/100 M.N.).
        Cuarta. - Intereses
        La deudora se obliga a pagar a la prestadora por concepto de interés ordinario, una tasa de
        26% (veintiséis por ciento) a 24 (veinticuatro) meses, calculado sobre el capital otorgado en 
        préstamo, es decir $598,000.00 (QUINIENTOS NOVENTA Y OCHO mil pesos 00/100
        M.N.).
        Solo se generarán intereses durante un plazo máximo de veinticuatro meses, contados a partir
        de la fecha de recepción del capital.
        Los intereses dejarán de generarse a partir de que el capital sea pagado. Solo se generarán
        intereses por cada mes completo que cumpla el capital sin ser pagado. En caso de pago
        anticipado, de ninguna manera se entenderá que quedan intereses comprometidos hasta el
        mes veinticuatro.
        Quinta. - Pago de capital e intereses El capital será liquidado una vez transcurridos
        veinticuatro meses.
        El primer pago de intereses se hará al mes 12 doce, el proporcional acumulado ($77,740.00 
        (setenta y siete mil setecientos cuarenta pesos 00/100 M.N.) y el restante ($77,740.00 (setenta 
        y siete mil setecientos cuarenta pesos 00/100 M.N.) se hará en 3 pagos:
        -Primer pago Febrero 2023 $25,913.33 (veinticinco mil novecientos trece pesos con treinta 
        y tres centavos 00/100 M.N.)
        -Segundo pago Junio 2023 $25,913.33 (veinticinco mil novecientos trece pesos con treinta y 
        tres centavos 00/100 M.N.)
        -Tercer pago Octubre 2023 $25,913.33 (veinticinco mil novecientos trece pesos con treinta 
        y tres centavos 00/100 M.N.)
        En caso de que el capital sea retornado antes de los 12 (doce) meses, se devolverá en su
        totalidad el capital y el rendimiento hasta el mes que la deudora retorne a la prestadora los
        mismos.
        Una vez transcurrido el periodo, el deudor tendrá un límite de cinco días hábiles para hacer
        el pago.
        El capital será retornado a “la prestadora” por T-mis en monedas estables</p>,
        date: '27/01/2023',
      }
    ],
    Rendimiento: [
      {
        id: 1,
        title: '26%'
      }
    ],
    Oficinas: [
      {
        id: 1,
        title: 'Lopez mateos Guadalajara Jalisco'
      }
    ],
  })

  return (
    <div className="w-full px-2 py-12 sm:px-32">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-black hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2  text-black bg-gray-400 rounded-lg">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} >
              <ul>
                {posts.map((post) => (
                  <li key={post.id} className="relative rounded-md p-3 text-center" >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-black">
                      <li>{post.date}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <Redes/>
    </div>
  )
}
