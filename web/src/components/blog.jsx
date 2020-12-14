import Site from "../site"
import { Fragment } from "@bikeshaving/crank";

export function ListEntry({ href, title }) {
    return (
        <li>
            <a href={href}>{title}</a>
        </li>
    );
}


export default async function Blog() {
    const res = await this.$fetch(Site.blog.posts);
    const posts = await res.json();

    return (
        <Fragment>
            <div class="px-4 lg:px-0">
                <h2 class="text-4xl font-semibold text-gray-800 leading-tight">Bloglist</h2>
            </div>

            <div class="flex flex-col lg:flex-row lg:space-x-12">
                <div class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                    <ul class="list-disc">
                        {posts.map((post) => (
                            <ListEntry href={`/blog/${post.id}`} title={post.title} />
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}