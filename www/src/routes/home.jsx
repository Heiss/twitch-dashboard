import Cards from "../components/cards"
import Showcase from "../components/showcase"
import { Fragment } from "@bikeshaving/crank"
import Subscribe from "../components/subscribe"
import Skills from "../components/skills"

export default function () {
    return (
        <Fragment>
            <div class="block md:flex md:space-x-2 px-2 lg:p-0">
                <Showcase />
            </div>
            <div class="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
                <div class="w-full lg:w-2/3">
                    <Cards />
                </div>
                <div class="w-full lg:w-1/3 px-3">
                    <Subscribe />
                    <div class="border border-dotted"></div>
                    <Skills />
                    <div class="border border-dotted"></div>
                </div>
            </div>
        </Fragment>
    );
}
