'use client';

import { useAppContext } from '@/context/AppContext';
import Header from '@/components/Header';
import HomeView from '@/components/HomeView';
import ProfileView from '@/components/ProfileView';

export default function Page() {
  const { activeView } = useAppContext();

  return (
    <>
      <Header />
      <main>
        {activeView === 'home' ? <HomeView /> : <ProfileView />}
      </main>
    </>
  );
}
