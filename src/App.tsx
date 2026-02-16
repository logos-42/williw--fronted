import { LanguageProvider } from './hooks/useLanguage';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Download from './components/Download';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Header />
        <main>
       
          <Hero />
          <Download />
          <Features />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
