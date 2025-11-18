import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  titleDe?: string;
  date: string;
  content: string;
  contentDe?: string;
  excerpt?: string;
  excerptDe?: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        const excerpt = content.split('\n\n')[0].substring(0, 200);

        let contentDeHtml = '';
        let excerptDe = '';
        if (data.contentDe) {
          const processedContentDe = await remark().use(html).process(data.contentDe);
          contentDeHtml = processedContentDe.toString();
          excerptDe = data.contentDe.split('\n\n')[0].substring(0, 200);
        }

        return {
          slug,
          title: data.title || slug,
          titleDe: data.titleDe,
          date: data.date || '',
          content: contentHtml,
          contentDe: contentDeHtml,
          excerpt: excerpt,
          excerptDe: excerptDe,
        };
      })
  );

  return allPosts.sort((a, b) => {
    const getTimestamp = (dateString: string): number => {
      if (!dateString) return 0;
      const timestamp = new Date(dateString).getTime();
      return isNaN(timestamp) ? 0 : timestamp;
    };
    const dateA = getTimestamp(a.date);
    const dateB = getTimestamp(b.date);
    return dateB - dateA;
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    let contentDeHtml = '';
    if (data.contentDe) {
      const processedContentDe = await remark().use(html).process(data.contentDe);
      contentDeHtml = processedContentDe.toString();
    }

    return {
      slug,
      title: data.title || slug,
      titleDe: data.titleDe,
      date: data.date || '',
      content: contentHtml,
      contentDe: contentDeHtml,
    };
  } catch (error) {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}
