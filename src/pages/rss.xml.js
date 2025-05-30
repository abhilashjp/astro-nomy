import rss from '@astrojs/rss';
import { getPublishedPosts } from '@/lib/content.js';
import { siteConfig } from '@/config/site';

export async function get(context) {
	const posts = await getPublishedPosts();
	return rss({
		title: siteConfig.name,
		description: siteConfig.description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}