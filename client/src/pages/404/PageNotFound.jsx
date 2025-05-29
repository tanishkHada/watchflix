import React, { useContext } from 'react'
import TransitionBlocks from '../../components/Transitions/TransitionBlocks'
import CutElement from '../../elements/CutElement'
import NavigateContext from '../../contexts/NavigateContext'

function PageNotFound() {
    const onNavigate = useContext(NavigateContext);

    return (
        <div className='w-full h-screen bg-[var(--dark-void)] flex flex-col justify-center items-center select-none'>
            <h1 className='text-[var(--lime-green)] font-kalmansk text-[350px] leading-none sm:text-[500px] mt-[-150px]'>404</h1>
            <h3 className='text-[var(--hot-pink)] font-rockstar text-[30px]'>Page Not Found</h3>

            <div className='flex text-white gap-3 mt-[50px]'>
                <span>Go back to </span>
                <CutElement
                    element={'HOME'}
                    fontSize={20}
                    onClickRoute={() => onNavigate('/')}
                />
            </div>

            <TransitionBlocks entry={true} exit={true} />
        </div>
    )
}

export default PageNotFound
