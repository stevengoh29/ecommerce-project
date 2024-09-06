'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import { useRouter } from "next/navigation"

const CouponListingPage = () => {
    const router = useRouter()

    return(
        <Container title="App Coupon Listing">
            <SectionContainer>
                <p>Hello</p>
            </SectionContainer>
            <SectionContainer>
                <Button label="Add App Coupon" onClick={() => router.push('/admin/app-coupon/add')} />
            </SectionContainer>
        </Container>
    )
}

export default CouponListingPage