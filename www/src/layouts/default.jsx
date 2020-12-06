import Nav from '../components/nav';
import Site from "../site"

export default function ({ children }) {
    return (
        <div class="max-w-screen-xl mx-auto">
            <Header />
            <main class="mt-10">
                {children}
            </main>
            <Footer />
        </div >
    );
}

function Header() {
    return (
        <header class="flex items-center justify-between py-2 border-b">
            <a href="#" class="px-2 lg:px-0 font-bold">
                {Site.navbarTitle}
            </a>
            <Nav />
        </header>
    );
}

function Footer() {
    return (
        <footer class="border-t mt-32 pt-12 pb-32 px-4 lg:px-0">
            <div class="flex">

                <div class="w-full md:w-1/3 lg:w-1/4">
                    <h6 class="font-semibold text-gray-700 mb-4">Company</h6>
                    <ul>
                        <li> <a href="" class="block text-gray-600 py-2">Team</a> </li>
                        <li> <a href="" class="block text-gray-600 py-2">About us</a> </li>
                        <li> <a href="" class="block text-gray-600 py-2">Press</a> </li>
                    </ul>
                </div>

                <div class="w-full md:w-1/3 lg:w-1/4">
                    <h6 class="font-semibold text-gray-700 mb-4">Content</h6>
                    <ul>
                        <li> <a href="" class="block text-gray-600 py-2">Blog</a> </li>
                        <li> <a href="" class="block text-gray-600 py-2">Privacy Policy</a> </li>
                        <li> <a href="" class="block text-gray-600 py-2">Terms & Conditions</a> </li>
                        <li> <a href="" class="block text-gray-600 py-2">Documentation</a> </li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
