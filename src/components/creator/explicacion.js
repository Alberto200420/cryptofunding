import explicacion from 'assets/img/explicacion_dashboard.png'

function Explicacion() {
    return (
        <div>
            <div className='mb-3'>
                <h1 className='text-2xl font-semibold text-gray-900'>USDT-USDC have 6 decimals</h1>
                <p>EG: $ 100 USD = 100000000 USDT-USDC</p>
                <h1 className='text-2xl font-semibold text-gray-900'>BUSD-DAI have 18 decimals</h1>
                <p>EG: $ 100 USD = 100000000000000000000 BUSD-DAI</p>
            </div>
            <p>
            To return the money with interest, you just have to copy and paste the number shown as 
            "Amount you must return with" into the "Amount" input field.<br/> For example:
            </p>
            <img className="rounded-md mt-1" src={ explicacion } alt="explication return amount"/>
            <p>
            You need to have the amount shown as "Amount you must return with" in your Metamask wallet.<br/>
            It doesn't have to be exact, you can have more than that amount, but only that amount will 
            be taken from your wallet.
            </p>
            <h1 className='text-2xl font-semibold text-gray-900 pt-3'>Return amount without the yield</h1>
            <p>
            You have to enter the exact amount you raised with each group of tokens in the "Amount" input field, 
            including decimals.<br/>
            For example, if you raised $1,548,482 USDT or USDC, you would enter with 6 decimal tokens: 1548482000000<br/>
            And if you raised $1,548,482 BUDS or DAI: 1548482000000000000000000
            </p>
        </div>
    )
}

export default Explicacion