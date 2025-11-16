import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '@/components/Layout';
import FileUploader from '@/components/FileUploader';

export default function ImageToPdf() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('tools.imageToPdf.title')} - PDF Wandler</title>
        <meta name="description" content={t('tools.imageToPdf.description')} />
        <meta name="keywords" content="Bilder zu PDF, JPG zu PDF, PNG zu PDF, Bildkonverter, kostenlos, DSGVO" />
        <meta property="og:title" content={`${t('tools.imageToPdf.title')} - PDF Wandler`} />
        <meta property="og:description" content={t('tools.imageToPdf.description')} />
        <link rel="canonical" href="https://your-domain.com/image-to-pdf" />
      </Head>
      <Layout>
        <FileUploader
        endpoint="/api/image-to-pdf"
        accept={{
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
        }}
        multiple={true}
        title={t('tools.imageToPdf.title')}
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
