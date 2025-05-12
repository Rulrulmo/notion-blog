import remarkBreaks from 'remark-breaks';
import remarkGemoji from 'remark-gemoji';
import remarkMath from 'remark-math';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

interface IProps {
  content: string;
}

export default function MdxRenderer({ content }: IProps) {
  return (
    <MDXRemote
      source={content ?? ''}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks, remarkGemoji, remarkMath],
          rehypePlugins: [
            rehypeSanitize,
            rehypePrettyCode,
            rehypeSlug,
            [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
            rehypeHighlight,
          ],
        },
      }}
    />
  );
}
