import routes from '../routes';
import {Context} from '@bikeshaving/crank';

Context.prototype.$isClient = true;
Context.prototype.$fetch = window.fetch.bind(window);
Context.prototype.$Chat = undefined;

function findData(page) {
    let data = {route: routes[0][0], module: routes[0][1], title: routes[0][2]};

    routes.forEach(([route, module, title]) => {
        if (route === page) {
            data = {route: route, module: module, title: title}
            return
        }
    })
    return data;
}

async function Loading({wait = 2000}) {
    await new Promise((resolve) => setTimeout(resolve, wait));
    return "Loading...";
}

export default async function* App() {
    let data = {};
    let module = routes[0][1];

    let loadPage = (ev) => {
        let page = ev.state.page;
        data = findData(page);
        this.$route = data.route;
        this.$title = data.title;
        module = data.module;
        document.title = this.$title;

        if (ev) {
            this.refresh();
        }
    }

    window.addEventListener("popstate", loadPage);

    try {
        for await (const _ of this) {
            const {default: Route} = await module();
            yield <Loading/>;
            await (yield <Route {...data} />);
            window.scrollTo(0, 0);
        }
    } finally {
        window.removeEventListener("popstate", loadPage);
    }
}
