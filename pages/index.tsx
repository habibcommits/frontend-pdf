import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { FiImage, FiLayers, FiArchive, FiServer, FiShield, FiDatabase, FiTrash2 } from 'react-icons/fi';

export default function Home() {
  const { t } = useTranslation('common');

  const tools = [
    {
      title: t('tools.imageToPdf.title'),
      description: t('tools.imageToPdf.description'),
      href: '/image-to-pdf',
      icon: FiImage,
      color: 'from-bright-teal to-blue-green',
    },
    {
      title: t('tools.mergePdf.title'),
      description: t('tools.mergePdf.description'),
      href: '/merge-pdf',
      icon: FiLayers,
      color: 'from-turquoise to-sky-aqua',
    },
    {
      title: t('tools.compressPdf.title'),
      description: t('tools.compressPdf.description'),
      href: '/compress-pdf',
      icon: FiArchive,
      color: 'from-french-blue to-bright-teal',
    },
  ];

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('subtitle')} />
        <meta name="keywords" content="PDF Tools, PDF konvertieren, PDF zusammenführen, PDF komprimieren, kostenlos, DSGVO, Deutschland" />
        <meta property="og:title" content={t('title')} />
        <meta property="og:description" content={t('subtitle')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('title')} />
        <meta name="twitter:description" content={t('subtitle')} />
        <link rel="canonical" href="https://your-domain.com/" />
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-deep-twilight via-bright-teal to-turquoise bg-clip-text text-transparent mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.href}
              className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-light-cyan hover:border-sky-aqua hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${tool.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <tool.icon className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-deep-twilight mb-3 group-hover:text-bright-teal transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
          </div>

          <div className="mt-20 bg-gradient-to-br from-white to-light-cyan rounded-2xl shadow-xl p-10 border border-frosted-blue/30">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-deep-twilight to-bright-teal bg-clip-text text-transparent mb-8 text-center">Über PDF Tools</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-sky-aqua/20 hover:border-sky-aqua/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-turquoise to-sky-aqua rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                ✓
              </div>
              <h3 className="font-bold text-deep-twilight mb-3 text-lg">Einfach zu bedienen</h3>
              <p className="text-gray-600">Intuitiv gestaltete Tools für maximale Benutzerfreundlichkeit.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-sky-aqua/20 hover:border-sky-aqua/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-bright-teal to-blue-green rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                €
              </div>
              <h3 className="font-bold text-deep-twilight mb-3 text-lg">100% kostenlos</h3>
              <p className="text-gray-600">Alle Tools können Sie kostenlos und ohne Einschränkungen nutzen.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-sky-aqua/20 hover:border-sky-aqua/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-french-blue to-bright-teal rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                🔒
              </div>
              <h3 className="font-bold text-deep-twilight mb-3 text-lg">Sicherheit</h3>
              <p className="text-gray-600">Dateien werden verschlüsselt übertragen und automatisch gelöscht.</p>
            </div>
          </div>
          </div>

          <div className="mt-20 bg-gradient-to-br from-deep-twilight via-french-blue to-bright-teal rounded-2xl shadow-2xl p-12 border-2 border-sky-aqua/30">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{t('security.title')}</h2>
            <p className="text-xl text-sky-aqua/90">{t('security.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-aqua to-turquoise rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <FiServer className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg text-center">{t('security.germanServers.title')}</h3>
              <p className="text-white/80 text-sm leading-relaxed text-center">{t('security.germanServers.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-aqua to-turquoise rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <FiShield className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg text-center">{t('security.dataProtection.title')}</h3>
              <p className="text-white/80 text-sm leading-relaxed text-center">{t('security.dataProtection.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-aqua to-turquoise rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <FiDatabase className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg text-center">{t('security.noDatabase.title')}</h3>
              <p className="text-white/80 text-sm leading-relaxed text-center">{t('security.noDatabase.description')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-aqua to-turquoise rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <FiTrash2 className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-white mb-3 text-lg text-center">{t('security.autoDelete.title')}</h3>
              <p className="text-white/80 text-sm leading-relaxed text-center">{t('security.autoDelete.description')}</p>
            </div>
          </div>
          </div>
        </div>
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
