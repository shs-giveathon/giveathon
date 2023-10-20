import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const Home: NextPage = () => {
  return redirect('/leaderboards/users');
};

export default Home;
