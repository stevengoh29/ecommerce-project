'use client'

import Container from "@/components/container/content-wrapper.container"
import MainCategoryListing from "@/components/shared-pages/main-categories/main-category-listing"

const MainCategoryListingPage = () => {
    return (
        <Container title={"Main Category Listing"}>
            <MainCategoryListing />
        </Container>
    )
}

export default MainCategoryListingPage