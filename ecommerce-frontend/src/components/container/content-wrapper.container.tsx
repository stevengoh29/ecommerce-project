import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import Breadcrumb from '../breadcrumb/breadcrumb';

type ContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    title: string;
}

const Container = (props: ContainerProps) => {
    const { title, className, ...rest } = props
    return (
        <div className={`p-5 flex-1 flex flex-col w-full items-start gap-3 ${className}`} {...rest}>
            <div>
                <p className='text-xl font-bold mb-1'>{title}</p>
                <Breadcrumb />
            </div>
            {props.children}
        </div>
    )
}

export default Container;