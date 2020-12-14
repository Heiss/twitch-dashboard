import MarkdownIt from 'markdown-it';
var md = MarkdownIt();

export default function ({ text = "" }) {
    return (
        <div>
            {md.render(text)}
        </div>
    );
}