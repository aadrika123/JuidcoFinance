import Link from 'next/link';
import React, { FC, ReactNode } from 'react';
import { useWorkingAnimation } from '../molecules/general/useWorkingAnimation';


interface LinkWithLoaderProps {
    children: ReactNode,
    className: string,
    href: string,
}

export const LinkWithLoader: FC<LinkWithLoaderProps> = (props) => {
    const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();


    const onClick = () => {
        activateWorkingAnimation();
    }

    return (
        <>
            {workingAnimation}
            <Link className={props.className} href={props.href} onClick={onClick} >{props.children}</Link>
        </>

    );
}