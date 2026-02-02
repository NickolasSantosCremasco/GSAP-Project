import Hero from '@/app/components/Hero'
import Navbar from './components/Navbar';

export default function Home() {
  return (
   <main>
    <Navbar/>
    <Hero/>
    <div className='h-dvh bg-black'></div>
   </main>
    
  );
}
