import React, { useState, useRef, useEffect } from 'react';
import { useIntersection } from 'react-use';

const MeetCreatorsPage = () => {
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
      <div className="min-w-6xl mx-auto">
        <div className="bg-gray-200 bg-opacity-90 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-customBlue text-center mb-8">Meet the Creators</h1>
          <div className="flex justify-center gap-8">
            {/* Creator 1 */}
            <div className="creator-card">
              <div className="p-6 rounded-lg shadow-md bg-white">
                <img src="https://media.licdn.com/dms/image/D4D03AQGR1Zw1CggsVQ/profile-displayphoto-shrink_100_100/0/1685976719759?e=1717027200&v=beta&t=3QySNENoexDQlBKI1UQR4SIjBCzIOW0IhIJ4CBAwjvc" alt="Developer Avatar" className="w-20 h-20 rounded-full mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-gray-900 text-center">Saad Dastgir</h2>
                <p className="text-gray-700 text-center">Full Stack Developer</p>
                <p className="text-gray-600 mt-4">Bio: As a MERN (MongoDB, Express.js, React.js, Node.js) developer with a passion for crafting robust and scalable web applications, I thrive on bringing innovative ideas to life. With expertise in version control systems like Git, I ensure smooth collaboration and efficient code management throughout the development lifecycle. Additionally, my proficiency in Python adds versatility to my skill set, allowing me to tackle a wide range of projects with agility and precision. </p>
                <div className="flex justify-center mt-4">
                  <a href="https://www.linkedin.com/in/saad-dastgir-8357b51b2?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADGYlWkBYEkqAfYvMvK2dKLuo2MxYI3dJzQ&lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BI3N4iISfR3qnaMpE6NK2Aw%3D%3D" className="text-blue-500 hover:underline mr-4">LinkedIn</a>
                  <a href="https://github.com/SAAD-DASTGIR" className="text-blue-500 hover:underline">GitHub</a>
                </div>
                <p className="text-gray-700 mt-2 text-center">Future Work: Creating innovative solutions for seamless user experiences.</p>
              </div>
            </div>
            
            {/* Creator 2 */}
            <div className="creator-card">
              <div className="p-6 rounded-lg shadow-md bg-white">
                <img src="https://media.licdn.com/dms/image/D4D03AQFDHSjdHDBFQQ/profile-displayphoto-shrink_100_100/0/1669445038863?e=1717027200&v=beta&t=3D8QiaDefZaDJPShMoJcY2q2xUvtOyWZKP185IGFKIo" alt="Developer Avatar" className="w-20 h-20 rounded-full mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-gray-900 text-center">Ahsan Abbasi</h2>
                <p className="text-gray-700 text-center">NLP Specialist</p>
                <p className="text-gray-600 mt-4">Bio: As an NLP (Natural Language Processing) expert proficient in tools like SpaCy and NLTK, I specialize in harnessing the power of language data to develop intelligent solutions. With a deep understanding of linguistic principles and advanced algorithms, I craft algorithms that extract insights, automate tasks, and enhance user experiences. Additionally, my expertise in version control systems ensures seamless collaboration and efficient management of NLP projects, enabling me to deliver impactful solutions that leverage the full potential of language data.</p>
                <div className="flex justify-center mt-4">
                  <a href="https://www.linkedin.com/in/ahsan-abbasi-4b3440234?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADpw9scBpopEmWsNrcal5WiPzPFy5RxacAE&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BgC5pNsCOQ6eEceqrTjLiJA%3D%3D" className="text-blue-500 hover:underline mr-4">LinkedIn</a>
                  <a href="https://github.com/SAAD-DASTGIR" className="text-blue-500 hover:underline">GitHub</a>
                </div>
                <p className="text-gray-700 mt-2 text-center">Future Work: Solving Complex problems using Natural Language Processing</p>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetCreatorsPage;
