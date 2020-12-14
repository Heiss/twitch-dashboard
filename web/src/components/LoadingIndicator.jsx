
export default async function ({text="Fetching articles..."}) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return <div>{text}</div>;
}