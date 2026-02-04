import Hero from '@/app/components/Hero'
import Navbar from './components/Navbar';
import Cocktails from './components/Cocktails';
import About from './components/About';

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
   </main>
    
  );
}
