import Hero from '@/app/components/Hero'
import Navbar from './components/Navbar';
import Cocktails from './components/Cocktails';
import About from './components/About';
import Art from './components/Art';
import Menu from './components/Menu';
import Contact from './components/Contact';

export default function Home() {
  return (
   <main>
    <Navbar/>
    <Hero/>
    <video 
          id="global-drink-video"
          src="/videos/output.mp4" 
          className="fixed top-0 left-0 w-full h-full object-cover z-50 mix-blend-screen pointer-events-none"
          muted 
          playsInline 
          preload="auto"
      />
    <Cocktails />
    <About />
    <Art />
    <Menu />
    <Contact />
   </main>
    
  );
}
