import { Fragment } from "@bikeshaving/crank"
import Site from "../site"

async function ShowcaseLeft({ post }) {
    const res = await this.$fetch(Site.author.all);
    const authors = await res.json();
    const author = authors[post.author];

    return (
        <a
            class="mb-4 md:mb-0 w-full md:w-2/3 relative rounded inline-block"
            style="height: 24em;"
            href={`/blog/${post.id}`}
        >
            <div class="absolute left-0 bottom-0 w-full h-full z-10"
                style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"></div>
            <img src={post.image} class="absolute left-0 top-0 w-full h-full rounded z-0 object-cover" />
            <div class="p-4 absolute bottom-0 left-0 z-20">
                <span class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">{post.category}</span>
                <h2 class="text-4xl font-semibold text-gray-100 leading-tight">{post.title}</h2>
                <div class="flex mt-3">
                    <img src={author.image}
                        class="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p class="font-semibold text-gray-200 text-sm"> {author.author.name} {author.author.familyName} </p>
                        <p class="font-semibold text-gray-400 text-xs"> {post.pub_date} </p>
                    </div>
                </div>
            </div>
        </a>
    )
}

async function ShowcaseRight({ post }) {
    const res = await this.$fetch(Site.author.all);
    const authors = await res.json();
    const author = authors[post.author];

    return (
        <a class="w-full md:w-1/3 relative rounded inline-block opacity-75 md:opacity-100"
            style="height: 24em;"
            href={`/blog/${post.id}`}
        >
            <div class="absolute left-0 top-0 w-full h-full z-10"
                style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"></div>
            <img src={post.image} class="absolute left-0 top-0 w-full h-full rounded z-0 object-cover" />
            <div class="p-4 absolute bottom-0 left-0 z-20">
                <span class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">{post.category}</span>
                <h2 class="text-3xl font-semibold text-gray-100 leading-tight">{post.title}</h2>
                <div class="flex mt-3">
                    <img
                        src={author.image}
                        class="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p class="font-semibold text-gray-200 text-sm"> {author.author.name} {author.author.familyName} </p>
                        <p class="font-semibold text-gray-400 text-xs"> {post.pub_date} </p>
                    </div>
                </div>
            </div>
        </a >
    )
}

export default async function () {
    const res = await this.$fetch(Site.blog.posts);
    const posts = await res.json();

    return (
        <Fragment>
            <ShowcaseLeft post={posts[0]} />
            <ShowcaseRight post={posts[1]} />
        </Fragment>
    )
}