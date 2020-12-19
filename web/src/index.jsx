import {renderer} from '@bikeshaving/crank/dom';

import App from './components/app';
import Layout from './layouts/default';
import {Context} from '@bikeshaving/crank';
import routes from './routes';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import $ from "jquery";

Context.prototype.$route = routes[0][0];
Context.prototype.$title = routes[0][2];

(async () => {
    await renderer.render(
        <Layout><App/></Layout>,
        document.body
    )
})();

$(function () {
    if (window.location.pathname === "/") {
        window.history.replaceState({"page": routes[0][0]}, routes[0][2], routes[0][0])
    }

    // When a link is clicked, use AJAX to load that page
    // but use pushState to change the URL bar
    $(document).on('click', 'a', function (e) {
        e.preventDefault();
        console.log(this)
        let $this = $(this);
        if($this.prop('hostname') !== window.location.hostname){
            window.location = this.href;
            return;
        }

        let link = $this.prop("pathname");

        if(link === "/") {
            link = routes[0][0];
        }

        let state = {"page": link};
        window.history.pushState(state, '', link);
        let popStateEvent = new PopStateEvent('popstate', {state: state});
        dispatchEvent(popStateEvent);
    });
});