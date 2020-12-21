import {Fragment} from "@bikeshaving/crank";
import routes from "../routes";
import * as user from "../api/Account"

import $ from "jquery";

function Link({to, isActive, children, icon}) {
    return (
        <li class="mr-6 my-2 md:my-0">
            <a href={to}
               class={`block py-1 md:py-3 pl-1 align-middle ${isActive ? 'text-blue-400' : 'text-gray-500'} no-underline hover:text-gray-100 border-b-2 ${isActive ? 'border-blue-400' : 'border-gray-900'} hover:border-blue-400`}>
                <i class={`${icon} mr-3 ${isActive ? 'text-blue-400' : ''}`}></i><span
                class="pb-1 md:pb-0 text-sm">{children}</span>
            </a>
        </li>
    );
}

function UserMenu() {
    return (<div id="userMenu"
                 class="bg-gray-900 rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
        <ul class="list-reset">
            <li><a href="#" class="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline">My
                account</a></li>
            <li><a href="#"
                   class="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline">Notifications</a>
            </li>
            <li>
                <hr class="border-t mx-2 border-gray-400"/>
            </li>
            <li><a href="#"
                   class="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline">Logout</a>
            </li>
        </ul>
    </div>);
}

async function UserButton() {
    this.addEventListener("click", check);

    let comp = <a href="https://id.twitch.tv/oauth2/authorize"
                  class="px-4 py-2 block text-gray-100 hover:bg-gray-800 no-underline hover:no-underline">Login</a>;

    if (await user.is_logged()) {
        comp = <Fragment>
            <button id="userButton" class="flex items-center focus:outline-none mr-3">
                <img class="w-8 h-8 rounded-full mr-4" src="https://i.pravatar.cc/300" alt="Avatar of User"/> <span
                class="hidden md:inline-block text-gray-100">Hi, {user.username()}</span>
            </button>
            <UserMenu/>
        </Fragment>;
    }

    return comp;
}

/*Toggle dropdown list*/

/*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/
function check(e) {
    console.log(e)
    let userMenuDiv = document.getElementById("userMenu");
    let userMenu = document.getElementById("userButton");

    if (userMenuDiv === null) {
        return;
    }

    let navMenuDiv = document.getElementById("nav-content");
    let navMenu = document.getElementById("nav-toggle");
    let target = (e && e.target) || (event && event.srcElement);

    //User Menu
    if (!checkParent(target, userMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, userMenu)) {
            // click on the link
            if (userMenuDiv.classList.contains("invisible")) {
                userMenuDiv.classList.remove("invisible");
            } else {
                userMenuDiv.classList.add("invisible");
            }
        } else {
            // click both outside link and outside menu, hide menu
            userMenuDiv.classList.add("invisible");
        }
    }

    //Nav Menu
    if (!checkParent(target, navMenuDiv)) {
        // click NOT on the menu
        if (checkParent(target, navMenu)) {
            // click on the link
            if (navMenuDiv.classList.contains("hidden")) {
                navMenuDiv.classList.remove("hidden");
            } else {
                navMenuDiv.classList.add("hidden");
            }
        } else {
            // click both outside link and outside menu, hide menu
            navMenuDiv.classList.add("hidden");
        }
    }

}

function checkParent(t, elm) {
    while (t.parentNode) {
        if (t == elm) {
            return true;
        }
        t = t.parentNode;
    }
    return false;
}

export default function* () {
    let active;

    window.addEventListener("popstate", (ev) => {
        if (ev) {
            this.refresh();
        }
    });

    for (const _ of this) {
        const active = window.location.pathname;
        const isActive = (str) => active === str;

        yield (<nav id="header" class="bg-gray-900 fixed w-full z-10 top-0 shadow">
                <div class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">

                    <div class="w-1/2 pl-2 md:pl-0">
                        <a class="text-gray-100 text-base xl:text-xl no-underline hover:no-underline font-bold"
                           href="/">
                            <i class="fas fa-moon text-blue-400 pr-3"></i> Admin Dark Mode
                        </a>
                    </div>
                    <div class="w-1/2 pr-0">
                        <div class="flex relative inline-block float-right">

                            <div class="relative text-sm text-gray-100">
                                <UserButton/>
                            </div>


                            <div class="block lg:hidden pr-4">
                                <button id="nav-toggle"
                                        class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-100 hover:border-teal-500 appearance-none focus:outline-none">
                                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-900 z-20"
                        id="nav-content">
                        <ul class="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                            {
                                routes
                                    .filter(([route, module, title]) => title !== undefined)
                                    .map(([route, module, title, icon]) => (
                                        <Link to={route} icon={icon} isActive={isActive(route)}>{title}</Link>
                                    ))
                            }
                        </ul>

                        <div class="relative pull-right pl-4 pr-4 md:pr-0">
                            <input type="search" placeholder="Search"
                                   class="w-full bg-gray-900 text-sm text-gray-400 transition border border-gray-800 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal"/>
                            <div class="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                                <svg class="fill-current pointer-events-none text-gray-500 w-4 h-4"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
