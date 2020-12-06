import { Fragment } from "@bikeshaving/crank"
import Site from "../site";

async function Card({ title, children, authorId, publish_date, image, href }) {
    const res = await this.$fetch(Site.author.all);
    const authors = await res.json();
    const author = authors[authorId];

    return (
        <a class="block rounded w-full lg:flex mb-10"
            href={href}
        >
            <div
                class="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-75"
                style={`background-image: url('${image}')`}
                title="deit is very important"
            >
            </div>
            <div class="bg-white rounded px-4 flex flex-col justify-between leading-normal">
                <div>
                    <div class="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">
                        {title}
                    </div>
                    <p class="text-gray-700 text-base">
                        {children}
                    </p>
                </div>
                <div class="flex mt-3">
                    <img src={author.image.sm}
                        class="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p class="font-semibold text-gray-700 text-sm capitalize"> {author.author.name} {author.author.familyName} </p>
                        <p class="text-gray-600 text-xs"> {publish_date} </p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default async function () {
    const res = await this.$fetch(Site.blog.posts);
    const posts = await res.json();

    return (
        <Fragment>
            {posts.slice(2, 5).map((post) => (
                <Card title={post.title} authorId={post.author} title={post.title} image={post.image} category={post.category} publish_date={post.pub_date} href={`/blog/${post.id}`}>
                    {post.headline}
                </Card>
            ))}
        </Fragment>
    )
}