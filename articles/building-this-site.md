---
title: 'Building This Website'
description: 'Why we built this website and the stack we used.'
coverArtwork: '/images/article-building-website.jpg'
author: 'bryceosterhaus'
date: May 20th, 2021
---

> “You do not really understand something unless you can explain it to your grandmother.” - Einstein

Our goal is fairly simple, we want to provide a public facing site that we can use as a platform for our frontend developers to share knowledge. The purpose of writing and sharing knowledge has two primary purposes, first, it helps the author deeply understand what they are writing about, and secondly, it gives the reader new insight.

In order to get this website off the ground, I thought it would be interesting to write this article at the same time as creating the site and share any insights as we build. This site will likely evolve significantly overtime, but now it's about starting something and getting it out there.

So here we go...

## Technology Stack

**Typescript:** Choosing typescript seemed like the logical choice since Clay is fully in typescript and we are slowly converting to typescript in Liferay DXP.

**Next.js:** Next.js is a popular framework to use in the industry and by using it here for this site, it gives us knowledge of other ecosystems that we might learn from. It also gives us flexibility and we can potentially integrate with Liferay's headless APIs in the future.

**Clay:** Clay is our homegrown UI library here we use both `@clayui/*` components and `@clayui/css`. This gives us the ability to quickly get the UI up and running while also [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food#:~:text=Eating%20your%20own%20dog%20food%20or%20dogfooding%20is%20the%20practice,a%20kind%20of%20testimonial%20advertising.) our own product.

**Remark + Prism:** These projects allows us to easily convert markdown documents to HTML. This way we can write articles in markdown without having to think about HTML and styling. Prism gives us the ability to share code blocks that have syntax highlighting.

## Difficulties

**_I am not a designer._** The first iterations of this website will be rough, but I think that is a good thing and will force me to grow and learn.

**_I am not a writer._** At least not yet. As with all things, you get better with practice. This is my start of practice.

**_Converting Markdown to HTML_**

```js
import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

export default async function markdownToHtml(markdown: string) {
	const result = await remark().use(html).use(prism).process(markdown);

	return result.toString();
}
```

This is our entire logic of converting [this markdown file](https://github.com/liferay-frontend/liferay-frontend.dev/blob/master/articles/building-this-site.md) to what you are reading now. I wanted a quick and easy way to add custom classes to the html via `remark-html`, but it wasn't as easy as you might think. I had to use `mdast-util-to-hast` (which remark uses already) and added a custom handler for blockquote nodes.

```js
// ...
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
			},
		})
		.use(prism)
		.process(markdown);
	return result.toString();
}
```

**_Using My Own Code_.** I wrote a handful of out React components over at [Clay](https://github.com/liferay/clay) and it was harder than expected. When you create projects, you always imagine them to be easily consumed and it always being the end-users fault. Well, it didn't take me more than 5 minutes into using `@clayui/card` before I found myself already annoyed at the API I previously created. That's the great part about dogfooding though, you get to only be mad at yourself and then you get to fix the problem.

## The Future

We aren't totally sure how often we will post or what will become of this site, but we hope that it will both be helpful for you and ourselves. We are happy to develop this site openly, so feel free to contribute and/or open an issue and ask questions.

![See you soon](https://media.giphy.com/media/l1J3CbFgn5o7DGRuE/giphy.gif)
