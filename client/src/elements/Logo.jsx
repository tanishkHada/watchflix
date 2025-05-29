import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Logo() {

    const title1Ref = useRef();
    const title2Ref = useRef();
    const parentRef = useRef();

    useGSAP(() => {
        const parent = parentRef.current;
        const title1 = title1Ref.current;
        const title2 = title2Ref.current;

        if (!parent || !title1 || !title2) return;

        const handleMouseEnter = () => {
            gsap.to(title1, { y: -3, duration: 0.2, ease: 'power2.out' });
            gsap.to(title2, { y: 3, duration: 0.2, ease: 'power2.out' });
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

        <div ref={parentRef} className='text-[40px] inline-block sm:text-[50px]'>
            <h1 ref={title1Ref} className='absolute font-humane leading-none'
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 0, 0 100%)',
                    willChange: 'transform'
                }}
            >WATCHFLIX</h1>
            <h1 ref={title2Ref} className='font-humane leading-none'
                style={{
                    clipPath: 'polygon(0 100%, 50% 0, 100% 100%, 10% 100%, 0 100%)',
                    willChange: 'transform'
                }}
            >WATCHFLIX</h1>
        </div>

    )
}

export default Logo
