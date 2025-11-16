import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '@/components/Layout';
import FileUploader from '@/components/FileUploader';

export default function MergePdf() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('tools.mergePdf.title')} - PDF Wandler</title>
        <meta name="description" content={t('tools.mergePdf.description')} />
        <meta name="keywords" content="PDF zusammenführen, PDF kombinieren, PDF verbinden, kostenlos, DSGVO" />
        <meta property="og:title" content={`${t('tools.mergePdf.title')} - PDF Wandler`} />
        <meta property="og:description" content={t('tools.mergePdf.description')} />
        <link rel="canonical" href="https://your-domain.com/merge-pdf" />
      </Head>
      <Layout>
        <FileUploader
        endpoint="/api/merge-pdf"
        accept={{
          'application/pdf': ['.pdf']
        }}
        multiple={true}
        title={t('tools.mergePdf.title')}
      />
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
