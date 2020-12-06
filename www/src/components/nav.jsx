import routes from "../routes";

function Link({ to, isActive, children }) {
    return (
        <li class="px-2 md:px-4">
            <a class={`font-semibold hover:text-green-600 ${isActive ? 'text-green-800' : 'text-gray-500'}`} href={to}>
                {children}
            </a>
        </li>
    );
}

export default function* () {
    let active;
    const isActive = (str) => active === str;

    for (const _ of this) {
        active = this.$route.split('/')[1] || 'home';

        yield (
            <nav class="px-2">
                <ul class="inline-flex items-center">
                    {
                        routes
                            .filter(([route, module, title]) => title !== undefined)
                            .map(([route, module, title]) => (
                                <Link to={route} isActive={isActive(route.split('/')[1] || 'home')}>{title}</Link>
                            ))
                    }
                </ul>
            </nav>
        );
    }
}
