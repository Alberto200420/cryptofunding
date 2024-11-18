import { Link } from 'react-router-dom'
import { HomeIcon } from "@heroicons/react/24/solid"

function TipsForInvesting() {
    return(
        <div className="mt-8">
            <Link to='/'>
                <HomeIcon className="h-9 w-9 ml-8" aria-hidden="true" />
            </Link>
            <h1 className="text-4xl text-center font-semibold tracking-tight sm:text-6xl">
                Tips to invest in this platform
            </h1>
            <div className="px-10 md:px-32 pt-3">
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    1- Invest in people you know
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                    Always on this platform it will be a recommendation to invest in people we trust and not in complete
                    unknown.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    2- Thoroughly investigate the investment opportunity
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Before investing, thoroughly research the investment opportunity and make sure you understand the details of the project.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    3- Verify the feasibility of the project
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Make sure the project is viable and has a good marketing strategy and a solid plan to reach its goals.
                you will know all this through the information that it gives to its community.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                4- Meet the person behind the project
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                It is important to know the person or team behind the project and their experience in the field.<br/>
                Investigate their history and reputation to assess if they are trustworthy, all thanks to the fact that you follow them
                closely on social media.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    5- Understand the terms of the investment
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Make sure you understand the terms of the investment, including any potential returns, terms, and any risks
                associated.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    6- Consider your long-term investment goals
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Think about your long-term investment goals and assess whether this investment fits with them.
                </p>
                <h5 className="mt-4 text-4xl font-medium text-center text-black">
                    7- Diversify your investments
                </h5>
                <p className="mt-4 text-2xl leading-8 text-black">
                Do not invest all your money in a single investment opportunity, it is important to diversify your
                 investments to minimize risk, whether at tmis or elsewhere, the important thing
                 is that you have options and opportunities to invest.
                </p>
            </div>
            <div className="my-4">
                <p className=" text-gray-400 text-center">&copy; 2023 T-mis Dapp. All rights reserved.</p>
            </div>
        </div>
    )
}

export default TipsForInvesting