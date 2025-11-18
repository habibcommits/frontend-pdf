import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getAllPosts, BlogPost } from '../../lib/blog';
import { formatDate } from '../../lib/blogUtils';

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'en';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          {t('blog.title', 'Blog')}
        </h1>

        {posts.length === 0 ? (
          <p className="text-gray-600">
            {t('blog.noPosts', 'No blog posts yet. Check back soon!')}
          </p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-blue-600 hover:text-blue-800 mb-2">
                    {locale === 'de' && post.titleDe ? post.titleDe : post.title}
                  </h2>
                </Link>
                {post.date && formatDate(post.date) && (
                  <p className="text-gray-500 text-sm mb-3">
                    {formatDate(post.date)}
                  </p>
                )}
                {(locale === 'de' ? post.excerptDe : post.excerpt) && (
                  <p className="text-gray-700 mb-4">
                    {locale === 'de' && post.excerptDe ? post.excerptDe : post.excerpt}...
                  </p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('blog.readMore', 'Read more')} →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 60,
  };
};
