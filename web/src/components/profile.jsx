import Site from "../site";

export default async function ({ id = 0 }) {
    const res = await this.$fetch(Site.author.all);
    const authors = await res.json();
    const author = authors[id];

    return (
        <div class="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div class="p-4 border-t border-b md:border md:rounded">
                <div class="flex py-2">
                    <img src={author.image.sm}
                        class="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p class="font-semibold text-gray-700 text-sm"> {author.author.name} {author.author.familyName} </p>
                        <p class="font-semibold text-gray-600 text-xs"> {author.position} </p>
                    </div>
                </div>
                <p class="text-gray-700 py-3">
                    {author.description}
                </p>
                <button class="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
                    Follow
              <i class='bx bx-user-plus ml-2' ></i>
                </button>
            </div>
        </div>
    )
}