import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntersection } from 'react-use';

const Landingexplore = () => {
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
      <div className="min-w-6xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center" style={{ backgroundImage: 'url("https://imgs.search.brave.com/yY7xauJkphcryTWepj4zdkRXXG9c0CXusuNrdA_M77k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/MjcwODA5OS9waG90/by93aGl0ZS1iYWNr/Z3JvdW5kLXdpdGgt/Y2lyY2xlLXNoYXBl/cy53ZWJwP2I9MSZz/PTE3MDY2N2Emdz0w/Jms9MjAmYz1HTy15/Z19adXYyYzdTaWFt/WWF6dTREd19FWGVs/V0QxanpUOWdtTm51/RmxvPQ")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
       
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl md:text-4xl font-bold text-customBlue mb-6">Contact Us</h1>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Need assistance or have a question? Our contact page is your direct line to our dedicated support team. Whether it's a query about our products, feedback, or assistance with an order, we're here to help. Reach out via phone, email, or fill out the form below, and we'll get back to you promptly. Your satisfaction is our priority.          </p>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
          Additionally, you can connect with us on social media platforms for updates, special offers, and to engage with our community. Our team is committed to providing you with personalized attention and resolving any concerns you may have swiftly. Your feedback fuels our continuous improvement, so don't hesitate to reach out—we're eager to hear from you!          </p>
          {/* <h2 className="text-2xl md:text-3xl font-bold text-customBlue mb-4">Why Choose Us?</h2> */}
          <button className="btn btn-primary"
          //  onClick= {window.location.href='mailto:msaaddastgir@gmail.com'}
           >
            Contact</button>
        
        </div>
        <div className="md:w-1/2 md:pr-8">
          <img
            src="https://imgs.search.brave.com/9_VCYGq7qyFj3XaE0VkS1riRll__Kxm470KS6uyeNXY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA5/MTg1ODQ1MC9waG90/by9jb250YWN0LXVz/LXNpZ24tb24tYS13/b29kZW4tZGVzay5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/RmY0ZW5JRlIyV0Mw/UUNhX0NTQjBSSEhh/TkpJLXQ2NFBhNlhC/dU5kZnV4ND0"
            alt="Company Illustration"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Landingexplore;
