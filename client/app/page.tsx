import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <div className="text-center font-bold text-3xl mt-4">Give-A-Thon Leaderboard</div>
      <div className="px-12 mt-6 grid grid-cols-3 gap-4">
        <div className="p-6 shadow-lg rounded-lg mr-10">
          <h2 className="text-center text-6xl font-bold">🥈</h2>
          <h3 className="mt-2 text-center text-2xl font-bold">2nd Place</h3>
          <h2 className="mt-4 text-center text-4xl text-green-500 font-bold">$75,000</h2>
          <h4 className="mt-4 text-center text-xl">Connor Lin</h4>
        </div>
        <div className="p-6 shadow-lg rounded-lg">
          <h2 className="text-center text-6xl font-bold">🥇</h2>
          <h3 className="mt-2 text-center text-2xl font-bold">1st Place</h3>
          <h2 className="mt-4 text-center text-4xl text-green-500 font-bold">💸 $100,000</h2>
          <h4 className="mt-4 text-center text-xl">Andrew Wolf</h4>
        </div>
        <div className="p-6 shadow-lg rounded-lg">
          <h2 className="text-center text-6xl font-bold">🥉</h2>
          <h3 className="mt-2 text-center text-2xl font-bold">3rd Place</h3>
          <h2 className="mt-4 text-center text-4xl text-green-500 font-bold">$50,000</h2>
          <h4 className="mt-4 text-center text-xl">Mikhail Seviary</h4>
        </div>
      </div>
      <div className="px-56 mt-6 text-xl">
        <div className="border-b-2 mb-1">
          <div className="flex justify-between font-bold">
            <h1>#.</h1>
            <h1>$ Raised</h1>
            <h1>Name</h1>
          </div>
        </div>
        <div className="border-b-2 mb-1">
          <div className="flex justify-between">
            <h1 className="font-semibold">4.</h1>
            <h1 className="ml-5 text-green-600">$25,000</h1>
            <h1>John Doe</h1>
          </div>
        </div>
        <div className="border-b-2 mb-1">
          <div className="flex justify-between">
            <h1 className="font-semibold">5.</h1>
            <h1 className="ml-5 text-green-600">$15,000</h1>
            <h1>John Doe</h1>
          </div>
        </div>
        <div className="border-b-2 mb-1">
          <div className="flex justify-between">
            <h1 className="font-semibold">6.</h1>
            <h1 className="ml-5 text-green-600">$10,000</h1>
            <h1>John Doe</h1>
          </div>
        </div>
        <div className="border-b-2 mb-1">
          <div className="flex justify-between">
            <h1 className="font-semibold">7.</h1>
            <h1 className="ml-5 text-green-600">$5,000</h1>
            <h1>John Doe</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
