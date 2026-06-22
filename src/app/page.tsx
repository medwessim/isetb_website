// app/page.tsx
import HeroSection from './components/Hero/app';
import Excutive from './components/ExcutiveBoard/page';
import Moment from './components/Moment/app';
import Chapters from './components/Chapters/app';

export default function Home() {
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