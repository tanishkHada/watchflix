import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Footer() {

  const title1Ref = useRef();
  const title2Ref = useRef();
  const parentRef = useRef();

  useGSAP(() => {
    const parent = parentRef.current;
    const title1 = title1Ref.current;
    const title2 = title2Ref.current;

    if (!parent || !title1 || !title2) return;

    const handleMouseEnter = () => {
      gsap.to(title1, { y: -10, duration: 0.2, ease: 'power2.out' });
      gsap.to(title2, { y: 10, duration: 0.2, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(title1, { y: 0, duration: 0.2, ease: 'power2.out' });
      gsap.to(title2, { y: 0, duration: 0.2, ease: 'power2.out' });
    };

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="overflow-hidden h-screen w-full bg-[var(--dark-void)] flex flex-col justify-center items-center select-none">

      <div className='flex-grow flex w-full justify-center items-center bg-[var(--lime-green)]'>

        <div ref={parentRef} className='relative text-[170px] inline-block sm:text-[600px] '>
          <h1 ref={title1Ref} className='mt-10 absolute-center font-humane leading-none'
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 0, 0 100%)',
              willChange: 'transform'
            }}
          >WATCHFLIX</h1>
          <h1 ref={title2Ref} className='mt-10 absolute-center font-humane leading-none'
            style={{
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%, 10% 100%, 0 100%)',
              willChange: 'transform'
            }}
          >WATCHFLIX</h1>
        </div>

      </div>

      <div className='footer text-[var(--lime-green)] p-10 w-full flex flex-col justify-center items-center gap-5 z-10'>
        <div className="links font-rockstar flex justify-center items-center gap-4 flex-wrap">
          <span>Terms of Service</span>
          <span>Contact</span>
          <span>FAQ</span>
        </div>

        <p className='text-center text-[13px] sm:mx-[300px]'>
          WatchFlix is your ultimate destination for streaming Movies and TV shows for free. Just pure entertainment! Enjoy a vast collection of your favorite content anytime, anywhere. Sit back, relax, and start streaming!
        </p>

        <span className='font-aalto text-[30px]'>© WATCHFLIX</span>
      </div>
    </div>
  )
}

export default Footer

