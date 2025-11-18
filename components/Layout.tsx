import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FiGlobe } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenLanguagePopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowLanguagePopup(true);
        localStorage.setItem('hasSeenLanguagePopup', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  const closePopup = () => {
    setShowLanguagePopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-cyan via-white to-frosted-light">
      <nav className="bg-gradient-to-r from-deep-twilight to-french-blue shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-sky-aqua transition-colors">
             PDF Wandler
            </Link>
            
            <div className="flex gap-4 items-center">
              <Link href="/" className="text-white/90 hover:text-sky-aqua transition-colors font-medium">
                {t('nav.home')}
              </Link>
              <Link href="/blog" className="text-white/90 hover:text-sky-aqua transition-colors font-medium">
                {t('nav.blog', 'Blog')}
              </Link>
              
              <div className="relative">
                <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                  <button
                    onClick={() => changeLanguage('de')}
                    className={`px-4 py-1.5 rounded-md font-medium transition-all ${
                      router.locale === 'de'
                        ? 'bg-sky-aqua text-deep-twilight shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    DE
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-4 py-1.5 rounded-md font-medium transition-all ${
                      router.locale === 'en'
                        ? 'bg-sky-aqua text-deep-twilight shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    EN
                  </button>
                </div>

                {showLanguagePopup && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-lg shadow-2xl p-4 z-50 animate-bounce">
                    <div className="absolute -top-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
                    <button
                      onClick={closePopup}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="bg-sky-aqua rounded-full p-2 flex-shrink-0">
                        <FiGlobe className="text-deep-twilight text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-deep-twilight mb-1">Change Language</h3>
                        <p className="text-sm text-gray-600">Click the buttons above to switch between German and English</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-12">
        {children}
      </main>

      <footer className="bg-gradient-to-r from-deep-twilight to-french-blue border-t border-bright-teal/20 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/80">
          <p>© 2025 PDF Wandler - Free and easy to use</p>
        </div>
      </footer>
    </div>
  );
}
