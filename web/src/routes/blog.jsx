import LoadingIndicator from '../components/LoadingIndicator';
import Blog from "../components/blog";



export default async function* () {
    if (this.$isClient) yield <LoadingIndicator />;
    for await (const _ of this) {
        yield <Blog />;
    }
}
