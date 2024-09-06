'use client'

import Container from "@/components/container/content-wrapper.container"
import SubCategoryListing from "@/components/shared-pages/sub-categories/sub-category-listing"

const SubcategoryListingPage = () => {
    return (
        <Container title={"Sub Category Listing"}>
            <SubCategoryListing />
        </Container>
    )
}

export default SubcategoryListingPage