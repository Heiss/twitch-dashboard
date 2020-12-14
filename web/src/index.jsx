import { renderer } from '@bikeshaving/crank/dom';

import App from './components/app';
import Layout from './layouts/default';
import { Context } from '@bikeshaving/crank';
import routes from './routes';


Context.prototype.$route = routes[0][0];
Context.prototype.$title = routes[0][2];

(async () => {
    await renderer.render(
        <Layout><App /></Layout>,
        document.body
    )
})();