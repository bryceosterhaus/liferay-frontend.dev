import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import all from 'mdast-util-to-hast/lib/all';

export default async function markdownToHtml(markdown: string) {
	const result = await remark()
		.use(html, {
			handlers: {
				blockquote: (h, node) => {
					return h(
						node,
						'blockquote',
						{
							className: 'blockquote',
						},
						all(h, node)
					);
				},
				image: (h, node) => {
					const imgNode = h(node, 'img', {
						src: node.url,
						title: node.title,
						alt: node.alt,
						className: 'text-center',
					});

					return h(
						node,
						'div',
						{
							className: 'text-center',
						},
						[imgNode]
					);
				},
			},
		})
		.use(prism)
		.process(markdown);
	return result.toString();
}
