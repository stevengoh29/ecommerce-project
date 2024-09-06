import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

type ContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Container = (props: ContainerProps) => {
    const { className, ...rest } = props
    return (
        <div className={classNames(`flex min-h-screen min-w-screen`, className)} {...rest}>
            {props.children}
        </div>
    )
}

export default Container;