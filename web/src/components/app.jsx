import routes from '../routes';
import { Context } from '@bikeshaving/crank';

Context.prototype.$isClient = true;
Context.prototype.$fetch = window.fetch.bind(window);
Context.prototype.$Chat = undefined;

function parseHash(hash) {
    if (hash.startsWith("#/item/")) {
        const id = hash.slice(7);
        if (id) {
            return { route: "item", id };
        }
    } else if (hash.startsWith("#/top/")) {
        const page = parseInt(hash.slice(6)) || 1;
        if (!Number.isNaN(page)) {
            return { route: "top", page };
        }
    } else {
        let data = undefined;
        routes.forEach(([route, module, title]) => {
            console.log(hash)
            console.log(route)
            console.log(route === hash)
            if (route === hash) {
                data = { route: route, module: module, title: title }
                return
            }
        })
        return data;
    }
}

async function Loading({ wait = 2000 }) {
    await new Promise((resolve) => setTimeout(resolve, wait));
    return "Loading...";
}

export default async function* App() {
    let data;
    let module;

    module = routes[0][1];
    data = {};

    const route = (ev) => {
        const hash = window.location.hash;

        data = parseHash(hash);

        if (data == null) {
            window.location.hash = "#/";
            data = {};
        } else {
            this.$route = data.route;
            this.$title = data.title;
            module = data.module;
        }

        if (ev) {
            this.refresh();
        }
    };

    
    window.addEventListener("hashchange", route);
    route();
    try {
        for await (const _ of this) {
            const { default: Route } = await module();
            yield <Loading />;
            await (yield <Route {...data} />);
            window.scrollTo(0, 0);
        }
    } finally {
        window.removeEventListener("hashchange", route);
    }
}
