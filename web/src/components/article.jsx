import Profile from "./profile";
import { Raw, Fragment } from '@bikeshaving/crank';


export default function ({ title = undefined, body, image = undefined, category = undefined, showProfile = false, children = undefined }) {
    var showTitleHead = (title !== undefined || image !== undefined || category !== undefined)

    return (
        <Fragment>
            {
                showTitleHead ?
                    <div class="px-4 lg:px-0">
                        {title !== undefined ? <h2 class="text-4xl font-semibold text-gray-800 leading-tight">{title}</h2> : ""}
                        {category !== undefined ? <a href="#" class="py-2 text-green-700 inline-flex items-center justify-center mb-2">{category}</a> : ""}
                        {image !== undefined ? <img src={image} class="w-full object-cover lg:rounded" style="height: 28em;" /> : ""}
                    </div>
                    : ""
            }

            <div class="flex flex-col lg:flex-row lg:space-x-12">
                <div class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                    <Raw value={children !== undefined ? children : body} />
                </div>

                {showProfile ? <Profile /> : ""}
            </div>
        </Fragment>
    )
}