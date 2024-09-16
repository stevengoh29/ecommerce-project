'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import TableActionButton from "@/components/button/table-action-button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import AdditionalItemsDialog from "@/components/dialog/form-input/additional-item-dialog"
import ProductVariantDialog from "@/components/dialog/form-input/product-variant-dialog"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormMultipleImageUpload from "@/components/input/form/form-multiple-image-upload"
import FormMultiselectInput from "@/components/input/form/form-multiselect-input"
import FormTextInput from "@/components/input/form/form-text-input"
import Table from "@/components/table/table"
import { useGetSubcategoriesOptionByStore } from "@/hooks/category/sub-category.query"
import useDialog from "@/hooks/common/use-dialog.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useGetProductDisplayOptionByStoreUuid } from "@/hooks/product-display/product-display.query"
import { useCreateProduct } from "@/hooks/products/product.mutation"
import { ProductDisplayData } from "@/services/products/product-display.service"
import { CreateAdditionalItemPayload, CreateProductPayload, CreateProductVariantPayload } from "@/services/products/product.service"
import uploadService from "@/services/uploads/upload.service"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    name: string
    description: string
    subcategoryUuid: string
    image: File[]
    productVariants: CreateProductVariantPayload[]
    additionalItems: CreateAdditionalItemPayload[]
    productDisplay: string[]
}

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


const AddProductPage = () => {
    const { handleSubmit, reset, control, watch, getValues, setValue } = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
            subcategoryUuid: '',
            image: [],
            productVariants: [],
            additionalItems: [],
            productDisplay: []
        }
    })

    const dialog = useDialog()
    const router = useRouter()

    const productVariants = watch('productVariants')
    const additionalItems = watch('additionalItems')

    const { storeId } = useAppSelector(root => root.users)
    const { data: subcategoryOptions } = useGetSubcategoriesOptionByStore(storeId ?? '')
    const { mutateAsync: create } = useCreateProduct()
    const { data: productDisplayOptions } = useGetProductDisplayOptionByStoreUuid(storeId ?? '')

    const setProductVariantToForm = (productVariant: CreateProductVariantPayload, type: 'INSERT' | 'UPDATE', index?: number) => {
        if (type == 'INSERT') setValue('productVariants', [...productVariants, productVariant])

        if (type == 'UPDATE' && index != undefined) {
            const updatedProductVariants = [...productVariants]
            updatedProductVariants[index] = productVariant
            setValue('productVariants', updatedProductVariants)
        }
    }

    const setAdditionalItemToForm = (additionalItem: CreateAdditionalItemPayload, type: 'INSERT' | 'UPDATE', index?: number) => {
        if (type == 'INSERT') setValue('additionalItems', [...additionalItems, additionalItem])

        if (type == 'UPDATE' && index != undefined) {
            const updatedAdditionalItems = [...additionalItems]
            updatedAdditionalItems[index] = additionalItem
            setValue('additionalItems', updatedAdditionalItems)
        }
    }

    const deleteProductVariant = (indexItem: number) => {
        setValue('productVariants', productVariants.filter((_, index) => index == indexItem))
        toast.success('Product variant deleted successfully')
    }

    const deleteAdditionalItem = (indexItem: number) => {
        setValue('additionalItems', additionalItems.filter((_, index) => index == indexItem))
        toast.success('Additional Item deleted successfully')
    }

    const onSaveProductVariant = (data?: CreateProductVariantPayload, index?: number) => {
        dialog.show({
            title: 'Save Product Variant',
            renderItem: (closeDialog) =>
                <ProductVariantDialog
                    defaultData={data ?? null}
                    onCompletedAction={closeDialog}
                    onSave={(productVariant) => setProductVariantToForm(productVariant, data ? 'UPDATE' : 'INSERT', data ? index : undefined)}
                />,
        })
    }

    const onSaveAdditionalItem = (data?: CreateAdditionalItemPayload, index?: number) => {
        dialog.show({
            title: 'Save Additional Items',
            renderItem: (closeDialog) =>
                <AdditionalItemsDialog
                    defaultData={data ?? null}
                    onCompletedAction={closeDialog}
                    onSave={(additionalItem) => setAdditionalItemToForm(additionalItem, data ? 'UPDATE' : 'INSERT', data ? index : undefined)}
                />
        })
    }

    const onSubmit = async (data: FormValues) => {
        try {
            const imagePath = await uploadService.uploadMultipleFile(data.image)
            const payload: CreateProductPayload = {
                name: data.name,
                description: data.description,
                imageUrl: JSON.stringify(imagePath),
                store: storeId ?? '',
                subcategoryUuid: data.subcategoryUuid,
                productVariants: data.productVariants,
                additionalItems: data.additionalItems,
                productDisplay: data.productDisplay
            }

            await create(payload)
            toast.success('Product has been saved successfully.')
            router.back()
        } catch (error: any) {
            console.error(error)
            toast.error(error.toString())
        }
    }

    return (
        <Container title="Add Product">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
                <SectionContainer canGoBack className="my-3">
                    <FlexBox className="py-3">
                        <FormMultipleImageUpload name="image" control={control} />
                        <FormTextInput isRequired label="Product Name" name="name" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                        <FormTextInput label="Product Description" name="description" control={control} multiline />
                        <FormDropdownInput
                            options={subcategoryOptions ?? []}
                            label="Subcategory"
                            name="subcategoryUuid"
                            control={control}
                        />
                        <FormMultiselectInput
                            options={productDisplayOptions ?? []}
                            label="Product Display"
                            name="productDisplay"
                            control={control}
                        />
                    </FlexBox>
                </SectionContainer>
                <SectionContainer className="my-3">
                    <FlexBox className="py-3">
                        <Button label={"Add New Product Variant"} className={'w-fit self-end'} onClick={() => onSaveProductVariant()} />
                        {productVariants.length == 0 ? <p className="text-center bg-slate-300 rounded-md p-3 font-bold">No Product Variant added...</p>
                            :
                            <Table
                                columns={PROD_VAR_COLUMN}
                                data={productVariants}
                                actionColumns={[
                                    { element: <TableActionButton type="EDIT" />, onClick: (variant: CreateProductVariantPayload, index: number) => onSaveProductVariant(variant, index) },
                                    { element: <TableActionButton type="DELETE" />, onClick: (_, index: number) => { deleteProductVariant(index) } }
                                ]}
                            />
                        }
                    </FlexBox>
                </SectionContainer>
                <SectionContainer className="my-3">
                    <FlexBox className="py-3">
                        <Button label={"Add New Additional Item"} className={'w-fit self-end'} onClick={() => onSaveAdditionalItem()} />
                        {additionalItems.length == 0 ? <p className="text-center bg-slate-300 rounded-md p-3 font-bold">No Additional Items added...</p>
                            :
                            <Table
                                columns={PROD_ADD_ITEMS_COLUMN}
                                data={additionalItems}
                                actionColumns={[
                                    { element: <TableActionButton type="EDIT" />, onClick: (variant: CreateAdditionalItemPayload, index: number) => onSaveAdditionalItem(variant, index) },
                                    { element: <TableActionButton type="DELETE" />, onClick: (_, index: number) => { deleteAdditionalItem(index) } }
                                ]}
                            />
                        }
                    </FlexBox>
                </SectionContainer>
                <div className="flex justify-end gap-5 mt-2">
                    <Button className={'w-40'} label="Reset" onClick={() => reset()} />
                    <Button className={'w-40'} label="Save" type="submit" onClick={handleSubmit(onSubmit)} />
                </div>
            </form>
        </Container>
    )
}

export default AddProductPage