import { defineDocumentType, makeSource } from "contentlayer/source-files";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
	path: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slug: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath?.split("/")?.slice(1)?.join("/"),
	},
};

const Blog = defineDocumentType(() => ({
	name: "Blog",
	filePathPattern: "./blog/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		description: { type: "string", required: true },
		published: { type: "boolean", required: false },
		date: { type: "date", required: false },
		repository: { type: "string", required: false },
		mainImage: {
			type: "json",
			required: false,
		},
		categories: {
			type: "json",
			required: false,
		},
	},
	computedFields,
}));


const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: "./projects/**/*.mdx",
	contentType: "mdx",
	fields: {
		published: { type: "boolean", required: false },
		title: { type: "string", required: true },
		description: { type: "string", required: true },
		date: { type: "date", required: false },
		url: { type: "string", required: false },
		repository: { type: "string", required: false },
	},
	computedFields,
}));


const Hobby = defineDocumentType(() => ({
	name: "Hobby",
	filePathPattern: "./hobby/**/*.mdx",
	contentType: "mdx",
	fields: {
		published: { type: "boolean", required: false },
		title: { type: "string", required: true },
		description: { type: "string", required: true },
		date: { type: "date", required: false },
		url: { type: "string", required: false },
		repository: { type: "string", required: false },
	},
	computedFields,
}));


export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Blog, Project, Hobby],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: "github-dark",
					onVisitLine(node) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (node.children.length === 0) {
							node.children = [{ type: "text", value: " " }];
						}
					},
					onVisitHighlightedLine(node) {
						node.properties.className.push("line--highlighted");
					},
					onVisitHighlightedWord(node) {
						node.properties.className = ["word--highlighted"];
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});

