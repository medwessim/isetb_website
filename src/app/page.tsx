// app/page.tsx
import GradientBackground from './components/Background/app';
import { Navbar } from './Nav/app';
import HeroSection from './components/Hero/app';
import Excutive from './components/ExcutiveBoard/page';
import Moment from './components/Moment/app';
import Chapters from './components/Chapters/app';
import About from './AboutUs/page';
import Footer from './Footer/page';


export default function Home() {
  const heroImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.png',
    '/images/4.jpg',
    '/images/5.jpg',
    // Add more images as needed
  ];
  return (
    <div>
      {/* Background animation - completely unchanged */}

      <HeroSection></HeroSection>
      <Moment></Moment>
      <Chapters></Chapters>
      <Excutive></Excutive>
     

    </div>
  );
}