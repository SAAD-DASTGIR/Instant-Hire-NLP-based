import React, { useState, useEffect } from 'react';

const AboutPage = () => {
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
    <div className={`bg-gray-100 min-h-full py-12 px-4 md:px-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 2.5s ease-in-out' }}>
      <div className="min-w-6xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center" style={{ backgroundImage: 'url("https://imgs.search.brave.com/tl9hIkv2b56QOzCFTJu7etjLIZV9EfRB9APZsoBGvA4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/b3B5LXNwYWNlLWds/YXNzZXMtZGVza18y/My0yMTQ4NTE5NzM0/LmpwZz9zaXplPTYy/NiZleHQ9anBn")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <div className="md:w-1/2 md:pr-8">
          <img
            src="https://imgs.search.brave.com/USxNgYAoXWitBSfmuJDZun6mzLJK5mUAnxNKNTPKY9s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9h/cHBseS1ub3ctZm9y/bS1pbmZvcm1hdGlv/bi1qb2ItY29uY2Vw/dF81Mzg3Ni0xMjUx/NTEuanBnP3NpemU9/NjI2JmV4dD1qcGc"
            alt="Company Illustration"
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl md:text-4xl font-bold text-customBlue mb-6">About Our Project</h1>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            We are dedicated to revolutionizing the job search experience by connecting talented individuals with
            innovative companies. Our platform streamlines the hiring process, making it easier for both job seekers
            and employers to find the perfect match.
          </p>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            Our mission is to empower individuals to discover fulfilling career opportunities while assisting companies
            in finding the best talent to drive their success. With our user-friendly interface and advanced matching
            algorithms, we aim to make job hunting and hiring efficient, transparent, and enjoyable.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-customBlue mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-800 text-lg leading-relaxed mb-6">
            <li>Extensive network of top-tier companies and job seekers</li>
            <li>Advanced matching algorithms for personalized recommendations</li>
            <li>Easy-to-use platform with intuitive navigation</li>
            <li>Transparent and efficient hiring process</li>
            <li>Dedicated support team committed to your success</li>
          </ul>
          <p className="text-gray-800 text-lg leading-relaxed">
            Join us in shaping the future of work and take the next step towards achieving your career goals or
            building your dream team today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
