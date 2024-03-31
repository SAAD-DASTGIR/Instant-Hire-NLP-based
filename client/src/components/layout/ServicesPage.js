import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landingexplore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`bg-gray-100 min-h-full py-12 px-4 md:px-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 5s ease-in-out' }}>
      <div className="min-w-6xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center" style={{ backgroundImage: 'url("https://imgs.search.brave.com/yY7xauJkphcryTWepj4zdkRXXG9c0CXusuNrdA_M77k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/MjcwODA5OS9waG90/by93aGl0ZS1iYWNr/Z3JvdW5kLXdpdGgt/Y2lyY2xlLXNoYXBl/cy53ZWJwP2I9MSZz/PTE3MDY2N2Emdz0w/Jms9MjAmYz1HTy15/Z19adXYyYzdTaWFt/WWF6dTREd19FWGVs/V0QxanpUOWdtTm51/RmxvPQ")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl md:text-4xl font-bold text-customBlue mb-6">Explore Users</h1>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Unlock the potential of our platform by exploring a vast network of talented individuals eager to contribute to your organization's success. With just a few clicks, browse through diverse profiles tailored to match your specific hiring needs. Discover candidates with the skills, experience, and passion that align with your company's vision and culture. From seasoned professionals to emerging talents, our platform offers a rich pool of candidates ready to elevate your team."
          </p>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Dive deeper into candidate profiles to gain valuable insights into their professional background, achievements, and aspirations. With our intuitive interface, easily view resumes, portfolios, and past projects to assess suitability and fit. Engage with candidates through direct messaging or schedule interviews seamlessly. Whether you're looking for a new team member or expanding your talent pool, our platform empowers you to make informed hiring decisions with confidence."
          </p>
          {/* <h2 className="text-2xl md:text-3xl font-bold text-customBlue mb-4">Why Choose Us?</h2> */}
          <Link to ="/profiles">
          <button className="btn btn-primary"> Explore Users </button>
          </Link>
        
        </div>
        <div className="md:w-1/2 md:pr-8">
          <img
            src="https://imgs.search.brave.com/Qpig4M_LlKDQ3nY6ITTqQQzFjs21MF532xvTLrEjrzM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bGlmZXdpcmUuY29t/L3RobWIvQ211Sncw/ZXdnUFVZY0IxSWln/eVVYb2Q3OXE0PS8z/NjB4MjQwL2ZpbHRl/cnM6bm9fdXBzY2Fs/ZSgpOm1heF9ieXRl/cygxNTAwMDApOnN0/cmlwX2ljYygpL25l/dy11c2VyLXdpbmRv/d3MtMTEtYmEzOWI5/ODIzNzhjNGQ0M2Jj/NTdjYzRhMDcyZDU3/MWUuanBn"
            alt="Company Illustration"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Landingexplore;
