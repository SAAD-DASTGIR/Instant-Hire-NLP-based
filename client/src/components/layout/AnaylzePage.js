import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntersection } from 'react-use';

const LandingloginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Change this threshold value as needed
  });

  useEffect(() => {
    if (intersection && intersection.intersectionRatio > 0.5) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [intersection]);

  return (
    <div ref={sectionRef} className={`bg-gray-100 min-h-full py-12 px-4 md:px-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 1s ease-in-out' }}>
      <div className="min-w-6xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center" style={{ backgroundImage: 'url("https://imgs.search.brave.com/laxDB36lo9IQf4IIANOICnRROC-d1XiEXmrSfFUWJYM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFlYldkdmVQNkwu/anBn")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <div className="md:w-1/2 md:pr-8">
          <img
            src="https://imgs.search.brave.com/dPJQnmnDhnHEseQLc3IH0g0koU3Q0gCcyGUYYercgcc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg1Lzc0LzIx/LzM2MF9GXzg1NzQy/MTYzX2tXbUk5OTBs/dXJsVjVPZGtDam56/SVc2SGkwTFdzcG9T/LmpwZw" 
            alt="Company Illustration"
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl md:text-4xl font-bold text-customBlue mb-6">Future Works</h1>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Innovating the landscape of recurring platforms, our future work endeavors to redefine convenience and efficiency in subscription management. With a focus on seamless user experiences, we're committed to enhancing our platform's capabilities. Expect intelligent subscription tracking that learns your preferences over time, simplifying decision-making and ensuring you always have the services you need when you need them. Our upcoming features will prioritize customization, allowing users to tailor their subscriptions effortlessly to suit their evolving needs. Moreover, we're dedicated to fostering transparent communication between users and service providers, ensuring clarity on terms, payments, and updates. Through continuous innovation and user-centric design, our platform is poised to become the go-to solution for hassle-free subscription management in the digital age.          </p>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            {/* Ready to dive in? Simply click the 'Log In' button below to access our platform and begin your quest for success. With interview scheduling features, CV analyzers, and skill-based user searches at your fingertips, finding the perfect match has never been easier. Let us empower you to achieve your goals and transform the way you approach your career or hiring journey. */}
          </p>
          {/* <h2 className="text-2xl md:text-3xl font-bold text-customBlue mb-4">Why Choose Us?</h2>z */}
        
        </div>
      </div>
    </div>
  );
};

export default LandingloginPage;
