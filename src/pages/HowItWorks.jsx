import { HomeIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'
import HomeImage from 'assets/img/home.png'
import HomeAnonimus from 'assets/img/HomeNoneAnonimus.png'
import vista from 'assets/img/vista.png'
import vistaPublic from 'assets/img/vistaPublic.png'
import comoInvertir from 'assets/img/comoInvertir.png'
import Coins from "components/Coins"

function ComoFunciona() {
    return(
        <div className="mt-8">
            <Link to='/'>
                <HomeIcon className="h-9 w-9 ml-8" aria-hidden="true" />
            </Link>
            <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl">
            How does tmis work?
            </h1>
            <div className="px-10 md:px-32 pt-3">
                <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl pt-20">
                Creating private projects
                </h1>
                <img className="rounded-md mt-8" src={ HomeAnonimus } alt="tmis cration private projects"/>
                <p className="mt-4 text-2xl leading-8 text-black">
                  When you want to create a new project, this part of the page appears where it asks for certain relevant information.<br/>
                  This private contract only asks you to fill in three required fields, both anonymously and non-anonymously, 
                  and you won't be able to create contracts without filling in these fields.<br/>
                  The first one asks us to write the terms and conditions of the contract, which is what you would put in a real-life 
                  contract where you provide your investors with all the relevant information.<br/>
                  You can put whatever you want, but as a recommendation, it's best to do it in the most professional way. <br/>This contract 
                  is private, and you'll have to share the contract address to allow your private investors to invest in your project.
                  <br/><br/>
                  The second field is the target amount you want to obtain. Here, you will only enter the amount in $ USD and not in any 
                  other currency. The reason for this is because investments are in stable currencies that are pegged to the US dollar 
                  (BUSD, USDT, USDC, DAI). <Coins/><br/><br/>
                  Example of how you have to do it in case you want to raise one million dollars: 1000000.<br/>
                  As you can see, you don't have to use dots, commas, or decimals no matter the amount, DO NOT USE COMMAS, POINTS, CENTS.<br/>
                  Incorrect example: 1,000,000.00<br/><br/>
                  The third field asks for the investment percentage, and you can only enter 2 numbers (e.g. 10).<br/> 
                  This is the percentage of investment return that you will give to the investors. For example, if someone 
                  invests $1,000 USD in your project, the investor will receive a 10% return on their investment ($1,000 + 10% = $1,100 return)
                  , earning them $100.
                  <br/><br/>The next step is to click the "Start investment round" button, which will open your cryptocurrency wallet.<br/>
                  You need to have some <a className="text-gray-600 no-underline hover:underline hover:text-black" href="https://polygonscan.com/" target='_blank' 
                  rel="noreferrer" >MATIC which is the native currency of polygon, </a> (or GOERLI if you wat to try in the testnet) 
                  in it to pay for the gas of the transaction. <br/> That's it You now have your contract with terms and conditions, 
                  target amount, and investment return percentage, and you're ready to share the contract address.<br/><br/>
                </p>
                <img className="rounded-md mt-8" src={ vista } alt="tmis private view"/>
                <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl pt-20">
                Creation of public projects
                </h1>
                <img className="rounded-md mt-8" src={ HomeImage } alt="tmis creation public projects"/>
                <p className="mt-4 text-2xl leading-8 text-black">
                    Here, you will also need to fill out more fields in the form, such as 'Instagram', 
                    'Web page', 'Twitter', 'LinkedIn', and 'Office'. These fields are not mandatory. The fields 
                    that ARE MANDATORY are: 'Email', 'trajectory', 'Personal photo', and 'Brand logo'.<br/><br/>
                    Let's briefly review the mandatory fields:<br/>
                    1- (write a contract containing terms and conditions:) The first field asks us to write the terms and 
                    conditions of the contract. Here, you would include all the relevant information you want to provide to 
                    your investors in a real-life contract.<br/>
                    2- (Target quantity:) The second field is the target amount you want to obtain. Here, you should only enter 
                    the amount in $ USD and not in any other currency. The reason for this is that investments are made in stablecoins 
                    that are pegged to the US dollar <br/>(BUSD, USDT, USDC, DAI) <Coins/>. <br/>Example of how you have to do it in 
                    case you want to raise one million dollars: 1000000.<br/>
                    As you can see, you don't have to use dots, commas, or decimals no matter the amount, DO NOT USE COMMAS, POINTS, 
                    CENTS.<br/>Incorrect example: 1,000,000.00<br/>
                    3- (Investment performance:) The third field asks for the investment percentage, and you can only enter 
                    2 digits (e.g., 10). This is the investment return percentage you will give to your investors.<br/>
                    4- 'Instagram' 'Web page' 'Twitter' 'Linkedin' They are URL type fields so you have to put the addresses of your 
                    social networks (if you have one, remember that it is not a mandatory field)<br/>
                    6- 'Ofice' It is a url type field that you can get in google maps (if you have any, 
                    remember that it is not a mandatory field) E.G: 
                    <a className="text-gray-600 no-underline hover:underline hover:text-black" href="https://goo.gl/maps/Z4z53V1f4mbw8hoG6" target='_blank' 
                    rel="noreferrer"> https://goo.gl/maps/Z4z53V1f4mbw8hoG6</a><br/> 
                    7- 'trajectory' is an introduction to yourself, your trajectory, and your professional career.<br/><br/>
                    The next step is to click the "Start investment round" button. This button will open your cryptocurrency 
                    wallet, and you will need to have some <a className="text-gray-600 no-underline hover:underline hover:text-black" href="https://polygonscan.com/" target='_blank' 
                    rel="noreferrer">MATIC, which is the native currency of Polygon. </a> This is to pay for the transaction gas.
                    <br/>Done! You now have your contract with more complete information such as terms and conditions, 
                    target quantity, investment return percentage, social media, website, email, trajectory, office address,  
                    and fhotos. You are now ready to share the contract address.<br/><br/>
                </p>
                <img className="rounded-md mt-8" src={ vistaPublic } alt="tmis public projects view"/>
                <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl pt-20">
                Inside the smart contract
                </h1>
                <p className="mt-4 text-2xl leading-8 text-black">
                When you create a smart contract, it takes two inputs in the constructor called "uint256 DyOchoDinero, uint256 SIXdinero".<br/> 
                What does this mean? The developer inputs two values that will be the target amount.<br/> When creating the contract, two target 
                amounts will be created: "DyOchoDinero" and "SIXdinero".<br/> This is because there are four tokens (USDC, USDT, BUSD, DAI), and 
                these tokens have different decimal places: (USDC, USDT) = 6 decimals and (BUSD, DAI) = 8 decimals.<br/> Therefore, the smart 
                contract will start from two independent options, which are the collection of those tokens.<br/> So, if someone sets a target 
                amount of $100,000 USD, $50,000 will be the limit for DyOchoDinero (BUSD, DAI), and the other $50,000 will be the limit 
                for SIXdinero (USDC, USDT), making half of the target amount always one of the two tokens.<br/> Hence, if people invest with 
                BUSD and reach the limit amount ($50,000 USD) with this group, the contract will no longer accept BUSD and DAI as payment.<br/> 
                It will only accept one of the two tokens of its counterpart in the other half (USDC, USDT).<br/><br/>

                When investing, the contract uses Permit2 technology (Permit2 is an extension of the Ethereum EIP-2612 protocol that 
                allows cryptocurrency users to authorize transactions securely and without having to approve each individual transaction.<br/> 
                This reduces the number of user interactions required to carry out a series of transactions, thereby reducing gas costs 
                and improving the user experience).<br/> It uses Uniswap to make signatures in Metamask and save gas when using this and other 
                platforms that use this protocol.<br/> This allows accepting the expense of a token on one platform without having to accept 
                it again on the next platform that requires it.<br/> All this is to save gas along the way.<br/> In particular, the 
                "signatureTransfer" function is described, which allows users to authorize the transfer of tokens without the need to sign 
                a transaction on each blockchain.<br/> Instead, users can sign a transaction on one blockchain, which can then be used 
                to authorize transactions on other blockchains without the need for a new signature.<br/> This also reduces gas 
                costs and improves transaction efficiency.<br/>
                You can learn more at <a className="text-gray-600 no-underline hover:underline hover:text-black" href="https://uniswap.org/blog/permit2-and-universal-router" target='_blank' 
                rel="noreferrer">permit2-and-universal</a> and
                 <a className="text-gray-600 no-underline hover:underline hover:text-black" href="https://docs.uniswap.org/contracts/permit2/reference/signature-transfer" target='_blank' 
                rel="noreferrer"> signature-transfer</a><br/><br/>
                

                I want to thank my colleague <a className="text-gray-600 no-underline hover:underline hover:text-black" href="https://github.com/merklejerk" target='_blank' 
                rel="noreferrer">merklejerk</a>, for helping me in this project.<br/> He is a great programmer, 
                and without him, I possibly couldn't have been able to create this.<br/>

                <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl pt-20">
                (INVESTOR)
                </h1>
                There are specific functions in the contract, the most important ones are for investing with USDT, USDC, DAI, 
                BUSD and withdrawing with USDT, USDC, DAI, BUSD depending on what you have invested with.<br/> There are also functions 
                for investors to withdraw their funds and get their returns, and in turn there is a function to withdraw the money 
                without the return (only if the developer calls that function).<br/> It also has mechanisms to limit access to certain 
                functions and ensure that the developer can only withdraw funds after certain conditions are met.<br/>
                Example of how to invest
                <img className="rounded-md my-4" src={ comoInvertir } alt="tmis how to invest"/>
                you don't have to use dots, commas, or decimals no matter the amount.<br/><br/>
                Investors can invest from $2 USD onwards and can invest as many times as they want.<br/> If an investor invests $10,000 
                USDC and then $15,000 USDT, both amounts will be added to their investment with "SixToken", making their total invested 
                balance $25,000 USD and vice versa with (BUSD, DAI).<br/>

                The contract stores the amount invested by each address and calculates its return (return generated by the developer).<br/> 
                Once the target amount is raised, the developer can withdraw the money and notify investors.<br/> Investors can also withdraw 
                their return once the project is completed and the developer returns the promised amount.<br/>


                <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl pt-20">
                (DEVELOPER)
                </h1>
                There is a function that allows the developer to withdraw funds from the cryptocurrency contract.<br/> This function 
                can only be activated once and will deposit the total amount in the contract, depending on the type of cryptocurrency 
                used by the investors.<br/><br/>

                There is a function to return coins without the promised return.<br/> This means that if you raised $1,000,000 USD 
                (one million US dollars), $500,000 USD in USDC and $500,000 USD in Dai, you can return that exact amount to your 
                users in their chosen currency (USDT, USDC, DAI, BUSD).<br/> Remember that the contract has four tokens and they are 
                in separate groups: USDT and USDC are one independent group, while BUSD and DAI are another independent group.<br/> So, 
                you can return the amount raised with the group of tokens of your choice.<br/> And they have to withdraw their money. <br/>
                This function can only be carried out within three months from the date of the contract balance withdrawal.<br/> This 
                means that if the developer creates a contract on 20/11/2022 and withdraws the money raised ($500,000 USD in USDC 
                and $500,000 USD in Dai) on 1/03/2023, the "return amount without return" function will be available until 1/06/2023. <br/>
                It only lasts for three months from the date of the money withdrawal.<br/> When you call this function, you are obliged to 
                return the entire amount raised (with the group of tokens of your choice).<br/> This is to protect the contract from 
                potential failures.<br/> And all of this is done by calling the function twice, once to return the USDT or USDC tokens 
                and once to return the BUSD or DAI tokens.<br/><br/>

                There is a function to return the amount with the return (the return is already calculated by the contract). <br/>
                This amount can only be called once per token group, and it must be the total amount collected from a selected 
                set of tokens plus the return.<br/> What does this mean? If the developer "Eric" created a contract with an 8% return 
                over 12 months, collected $500,000 USDT and $50,000 BUSD, withdrew the money, used it for his business and generated 
                profits, he will have to return the amount of $540,000 with USDC or USDT ((Raised X Interest rate percentage / 100) 
                = Return + Raised) ((500,000 X 8 / 100) = 40,000 + 500,000) in one function (this must be the exact amount, not more, 
                not less) and vice versa with the other group of tokens.<br/>

                He will have to return the amount of $54,000 with BUSD or DAI ((Raised X Interest rate percentage / 100) = Return + 
                Raised) ((50,000 X 8 / 100) = 4,000 + 50,000) in one function (this must be the exact amount, not more, not less).<br/>

                Once you use the "return amount" function, you cannot use the "return due to contingency" function, and vice versa.<br/><br/>
                </p>
            </div>
        </div>
    )
}

export default ComoFunciona