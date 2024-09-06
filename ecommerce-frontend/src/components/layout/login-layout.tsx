import { ReactNode } from 'react'
import Container from '../container/root-wrapper.container';

interface ILoginLayoutProps {
    children: ReactNode
}

const LoginLayout = ({ children }: ILoginLayoutProps) => {
    return <Container className='background-image justify-center items-center'>{children}</Container>
}

export default LoginLayout;