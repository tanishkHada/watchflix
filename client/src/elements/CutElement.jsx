import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function CutText({ element, fontSize = 20, onClickRoute }) {

    const ele1Ref = useRef();
    const ele2Ref = useRef();
    const parentRef = useRef();

    useGSAP(() => {
        const parent = parentRef.current;
        const title1 = ele1Ref.current;
        const title2 = ele2Ref.current;

        if (!parent || !title1 || !title2) return;

        const handleMouseEnter = () => {
            gsap.to(title1, { x: 2, duration: 0.2, ease: 'power2.out' });
            gsap.to(title2, { x: -2, duration: 0.2, ease: 'power2.out' });
        };

        const handleMouseLeave = () => {
            gsap.to(title1, { x: 0, duration: 0.2, ease: 'power2.out' });
            gsap.to(title2, { x: 0, duration: 0.2, ease: 'power2.out' });
        };

        parent.addEventListener('mouseenter', handleMouseEnter);
        parent.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            parent.removeEventListener('mouseenter', handleMouseEnter);
            parent.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (

        <div ref={parentRef} 
        onClick={onClickRoute}
        className='mt-1 cursor-pointer font-rockstar inline-block sm:mt-0'
        style={{fontSize: `${fontSize}px`}}
        >
            <div
                ref={ele1Ref} className='absolute leading-none'
                style={{
                    clipPath: 'polygon(0 100%, 100% 100%, 100% 45%, 0 45%)',
                    willChange: 'transform'
                }}
            >{element}
            </div>
            <div
                ref={ele2Ref} className='leading-none'
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                    willChange: 'transform'
                }}
            >{element}
            </div>
        </div>

    )
}

export default CutText

