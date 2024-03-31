import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntersection } from 'react-use';

const LandingloginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1, 
  });

  useEffect(() => {
    if (intersection && intersection.intersectionRatio > 0.5) {
      setIsVisible(true);
    }
  }, [intersection]);

  return (
    <div ref={sectionRef} className={`bg-gray-100 min-h-full py-12 px-4 md:px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="min-w-6xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center" style={{ backgroundImage: 'url("https://imgs.search.brave.com/laxDB36lo9IQf4IIANOICnRROC-d1XiEXmrSfFUWJYM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFlYldkdmVQNkwu/anBn")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <div className="md:w-1/2 md:pr-8">
          <img
            src="https://imgs.search.brave.com/WRN9oCMO7N_saFfDMUfyiTs-7k2UlMASjMkVBoQsVV4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC94ejFkbnUy/NGVneWQvNzc3R1dQ/Mm5VZ2hjT0tHR085/Yk1WUC9jYTExYmEw/YmJlNWJhOTM0YThh/OWYxOTg1YjgzNGZj/Ni93b3JraW5nLXBl/cnNvbi5qcGVn"
            alt="Company Illustration"
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl md:text-4xl font-bold text-customBlue mb-6">Get started</h1>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Embark on your journey towards career excellence or building a dynamic team effortlessly with our comprehensive suite of tools and services. From personalized dashboards for both applicants and HR professionals to intuitive job listings and a robust CV builder, we offer everything you need to navigate the job market seamlessly. Whether you're seeking your dream job or top-tier talent, our platform simplifies the process, saving you time and effort.
          </p>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Ready to dive in? Simply click the 'Log In' button below to access our platform and begin your quest for success. With interview scheduling features, CV analyzers, and skill-based user searches at your fingertips, finding the perfect match has never been easier. Let us empower you to achieve your goals and transform the way you approach your career or hiring journey.</p>
          {/* <h2 className="text-2xl md:text-3xl font-bold text-customBlue mb-4">Why Choose Us?</h2>z */}
          <Link to ="/login">
          <button className="btn btn-primary"> Log in </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingloginPage;
