'use client'

import FlexBox from "@/components/box/flex-box"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormMultiselectInput from "@/components/input/form/form-multiselect-input"
import FormTextInput from "@/components/input/form/form-text-input"
import MultiselectInput from "@/components/input/multiselect-input"
import Table from "@/components/table/table"
import { useGetSubcategoriesOptionByStore } from "@/hooks/category/sub-category.query"
import { useGetIdByParams } from "@/hooks/common/use-params.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useGetProductDisplayOptionByStoreUuid } from "@/hooks/product-display/product-display.query"
import { useGetProductByUuid } from "@/hooks/products/product.query"
import { SubcategoryData } from "@/services/categories/sub-category.service"
import { ProductDisplayData } from "@/services/products/product-display.service"
import { ProductData } from "@/services/products/product.service"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

const PROD_VAR_COLUMN = [
    { key: 'name', label: 'Product Variant Name', width: 'w-32' },
    { key: 'description', label: 'Product Variant Description', width: 'w-64' },
    { key: 'sku', label: 'Product Variant SKU', width: 'w-32' },
    { key: 'price', label: 'Price', width: 'w-32' },
    { key: 'stock', label: 'Stock', width: 'w-32' },
]

const PROD_ADD_ITEMS_COLUMN = [
    { key: 'name', label: 'Additional Item Name', width: 'w-32' },
    { key: 'price', label: 'Price', width: 'w-32' },
    { key: 'stock', label: 'Stock', width: 'w-32' },
]


const ProductViewPage = () => {
    const id = useGetIdByParams()
    const { storeId } = useAppSelector(root => root.users)
    const { data } = useGetProductByUuid(id)
    const { data: subcategoryOptions } = useGetSubcategoriesOptionByStore(storeId ?? '')
    const { data: productDisplayOptions } = useGetProductDisplayOptionByStoreUuid(storeId ?? '')
    // console.log(data)

    const initialValue = {
        name: data?.name ?? '',
        uuid: data?.uuid ?? '',
        description: data?.description ?? '',
        productAdditionalItem: data?.productAdditionalItem ?? [],
        productVariant: data?.productVariant ?? [],
        subcategoryUuid: (data?.subCategory as SubcategoryData)?.uuid ?? '',
        store: data?.store ?? '',
        productDisplays: (data?.productDisplays as ProductDisplayData[])?.map((display) => display.uuid) ?? []
    }

    const { control, reset, watch } = useForm<ProductData>({
        defaultValues: initialValue
    })

    const productVariant = watch('productVariant')
    const additionalItems = watch('productAdditionalItem')

    useEffect(() => {
        reset(initialValue)
    }, [data])

    return (
        <Container title="Product View Page">
            <SectionContainer canGoBack title="Product Data">
                <FlexBox>
                    <FormTextInput label="Name" name="name" control={control} disabled />
                    <FormTextInput label="Description" name="description" control={control} disabled />
                    {subcategoryOptions && <FormDropdownInput label="Subcategory" name="subcategoryUuid" options={subcategoryOptions ?? []} control={control} disabled />}
                    {productDisplayOptions && < FormMultiselectInput label="Product Display" name="productDisplays" control={control} options={productDisplayOptions ?? []} disabled />}
                </FlexBox>
            </SectionContainer>
            <SectionContainer title="Product Variant">
                {productVariant?.length == 0 ? <p className="text-center bg-slate-300 rounded-md p-3 font-bold">No Product Variant added...</p>
                    :
                    <Table
                        columns={PROD_VAR_COLUMN}
                        data={productVariant ?? []}
                    />
                }
            </SectionContainer>
            <SectionContainer title="Product Additional Items">
                {productVariant?.length == 0 ? <p className="text-center bg-slate-300 rounded-md p-3 font-bold">No Additional Items added...</p>
                    :
                    <Table
                        columns={PROD_ADD_ITEMS_COLUMN}
                        data={additionalItems ?? []}
                    />
                }
            </SectionContainer>
        </Container>
    )
}

export default ProductViewPage