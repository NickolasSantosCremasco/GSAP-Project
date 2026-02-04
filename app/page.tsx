import Hero from '@/app/components/Hero'
import Navbar from './components/Navbar';
import Cocktails from './components/Cocktails';

export default function Home() {
  return (
   <main>
    <Navbar/>
    <Hero/>
    <Cocktails />
   </main>
    
  );
}
