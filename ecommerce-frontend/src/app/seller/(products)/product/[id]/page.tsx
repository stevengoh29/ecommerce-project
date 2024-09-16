'use client'

import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import { useGetIdByParams } from "@/hooks/common/use-params.hook"
import { useGetProductByUuid } from "@/hooks/products/product.query"
import { useParams } from "next/navigation"



const ProductViewPage = () => {
    const id = useGetIdByParams()
    const { data } = useGetProductByUuid(id)
    console.log(data)
    
    return (
        <Container title="Product View Page">
            <SectionContainer canGoBack title="Product Data">
                <p>Hello</p>
            </SectionContainer>
            <SectionContainer title="Product Variant">
                <p>Hello</p>
            </SectionContainer>
            <SectionContainer title="Product Additional Items">
                <p>Hello</p>
            </SectionContainer>
        </Container>
    )
}

export default ProductViewPage