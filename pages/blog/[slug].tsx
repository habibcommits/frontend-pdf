import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getPostBySlug, getAllSlugs, BlogPost } from '../../lib/blog';
import { formatDate } from '../../lib/blogUtils';

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← {t('blog.backToBlog', 'Back to Blog')}
        </Link>

        <article className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {locale === 'de' && post.titleDe ? post.titleDe : post.title}
          </h1>
          {post.date && formatDate(post.date) && (
            <p className="text-gray-500 mb-8">
              {formatDate(post.date)}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: locale === 'de' && post.contentDe ? post.contentDe : post.content }}
          />
        </article>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 60,
  };
};
