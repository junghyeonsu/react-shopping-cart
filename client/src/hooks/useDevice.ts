import React, { useEffect, useState } from 'react';

type deviceType = 'mobile' | 'tablet' | 'laptop' | 'pc';

const useDevice = () => {
  const [type, setType] = useState<deviceType>('pc');

  useEffect(() => {
    const handleUserDevice = () => {
      if (window.innerWidth <= 600) {
        setType('mobile');
      } else if (window.innerWidth <= 900) {
        setType('tablet');
      } else if (window.innerWidth <= 1280) {
        setType('laptop');
      } else {
        setType('pc');
      }
    };
    handleUserDevice();

    window.addEventListener('resize', handleUserDevice);
    return () => window.removeEventListener('resize', handleUserDevice);
  }, []);

  return type;
};

export default useDevice;
