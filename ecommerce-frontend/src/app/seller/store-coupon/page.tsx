'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import { useRouter } from "next/navigation"

const StoreCouponPage = () => {
    const router = useRouter()

    return (
        <Container title="Store Coupon Listing">
            <SectionContainer>
                <p>Filter</p>
            </SectionContainer>
            <SectionContainer className="gap-3 flex flex-col">
                <Button label="Add New Store Coupon" className={'self-end'} onClick={() => router.push('/seller/store-coupon/add')} />
            </SectionContainer>
        </Container>
    )
}

export default StoreCouponPage