import { useRef } from 'react';
import gsap from 'gsap';

const ActionButton = ({ btnText1, btnText2, onClickButton, bgColor = 'var(--lime-green)', color = 'black'}) => {
    const buttonRef = useRef(null);
    const pathRef = useRef(null);
    const text1Ref = useRef(null); 
    const text2Ref = useRef(null); 

    const idlePath = "M144,6 L144,6 Q166,6 166,27 L166,23 Q166,44 144,44 L22,44 Q1,44 1,23 L1,27 Q1,6 22,6 Z";   
    const hoverPath = "M152,5 L152,5 Q156,5 156,9 L158,41 Q158,45 154,45 L10,48 Q6,49 6,45 L4,6 Q4,2 8,2";

    const handleMouseEnter = () => {
        gsap.to(pathRef.current, {
            attr: { d: hoverPath },
            duration: 0.5,
            ease: "elastic.out(1,0.4)"
        });
        
        gsap.to(text1Ref.current, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.fromTo(text2Ref.current, 
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.3, 
                ease: "power2.out",
            }
        );
    };

    const handleMouseLeave = () => {
        gsap.to(pathRef.current, {
            attr: { d: idlePath },
            duration: 0.5,
            ease: "elastic.out(1,0.4)"
        });
        
        gsap.to(text2Ref.current, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(text1Ref.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <div
            ref={buttonRef}
            className="relative inline-block cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClickButton}
        >
            <svg
                width="130"
                height="50"
                viewBox="0 0 166 50"
                className="w-full h-auto"
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    d={idlePath}
                    fill={bgColor}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span 
                    ref={text1Ref}
                    className="text-[20px] font-rockstar absolute"
                    style={{color: `${color}`}}
                >
                    {btnText1}
                </span>
                <span 
                    ref={text2Ref}
                    className="text-[20px] font-rockstar absolute opacity-0"
                    style={{ transform: 'translateY(20px)', color: `${color}` }}
                >
                    {btnText2}
                </span>
            </div>
        </div>
    );
};

export default ActionButton;