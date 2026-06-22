// app/page.tsx
import HeroSection from './components/Hero/app';
import Excutive from './components/ExcutiveBoard/page';
import Moment from './components/Moment/app';
import Chapters from './components/Chapters/app';
import LegacyMessages from './components/LegacyMessages/page';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Moment />
      <Chapters />
      <Excutive />
      <LegacyMessages />
    </div>
  );
}
