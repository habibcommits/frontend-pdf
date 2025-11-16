import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '@/components/Layout';
import CompressPdfUploader from '@/components/CompressPdfUploader';

export default function CompressPdf() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('tools.compressPdf.title')} - PDF Wandler</title>
        <meta name="description" content={t('tools.compressPdf.description')} />
        <meta name="keywords" content="PDF komprimieren, PDF verkleinern, PDF Dateigröße reduzieren, kostenlos, DSGVO" />
        <meta property="og:title" content={`${t('tools.compressPdf.title')} - PDF Wandler`} />
        <meta property="og:description" content={t('tools.compressPdf.description')} />
        <link rel="canonical" href="https://your-domain.com/compress-pdf" />
      </Head>
      <Layout>
        <CompressPdfUploader />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common'])),
    },
  };
};
