import LoadingIndicator from '../components/LoadingIndicator';
import Body from "../components/article";
import Site from "../site"

async function Article({ id }) {
    const res = await this.$fetch(Site.blog.posts);
    const posts = await res.json();
    const post = posts[id];


    return (
        <Body title={post.title} image={post.image} category={post.category} showProfile={true}>
            {post.body}
        </Body>
    );
}

export default async function* ({ id }) {
    if (this.$isClient) yield <LoadingIndicator />;
    for await (const _ of this) {
        yield <Article id={id} />;
    }
}
