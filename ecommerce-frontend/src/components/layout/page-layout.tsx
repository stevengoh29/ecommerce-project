'use client'

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import Container from "../container/root-wrapper.container";
import { NO_SIDEBAR_PATH } from "@/core/config/sidebar.config";
import Sidebar from "../sidebar/sidebar";
import Loading from "../loading/loading";

interface IPageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = (props: IPageLayoutProps) => {
    const [opened, handler] = useDisclosure();
    const matches = useMediaQuery('(min-width: 74em)');
    const PATH_NAME = usePathname();

    if(opened == undefined || matches == undefined) return <Loading />

    if (NO_SIDEBAR_PATH.includes(PATH_NAME)) {
        return (
            <Container className={PATH_NAME == "/login" ? "background-image" : ""}>
                {props.children}
            </Container>
        )
    }

    return (
        <Container className="flex-row flex">
            {(opened || matches) && <Sidebar />}
            {props.children}
        </Container>
    )
}

export default PageLayout;