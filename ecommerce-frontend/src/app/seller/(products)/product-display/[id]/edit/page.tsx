'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import TableActionButton from "@/components/button/table-action-button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import ProductDialog from "@/components/dialog/form-input/product-dialog"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormTextInput from "@/components/input/form/form-text-input"
import Loading from "@/components/loading/loading"
import Table, { TableColumnType } from "@/components/table/table"
import useDialog from "@/hooks/common/use-dialog.hook"
import { useUpdateProductDisplay } from "@/hooks/product-display/product-display.mutation"
import { useGetProductDisplay, useGetProductDisplayById } from "@/hooks/product-display/product-display.query"
import { UpdateProductDisplayPayload } from "@/services/products/product-display.service"
import { ProductData } from "@/services/products/product.service"
import { watch } from "fs"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Params = {
    id: string
}

type FormValues = {
    name: string
    description: string
    isInactive: boolean
    products: ProductData[]
}

const PROD_COLUMN = [
    { key: 'uuid', label: '# Id', width: 'w-32', type: 'LINK' as TableColumnType },
    { key: 'imageUrl', label: 'Image', width: 'w-9', type: 'IMAGES' as TableColumnType },
    { key: 'name', label: 'Product Name', width: 'w-48' },
    { key: 'subCategory.name', label: 'Subcategory Name', width: 'w-48' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: 'BOOL' as TableColumnType },
]

const EditProductDisplayPage = () => {
    const params = useParams<Params>()
    const router = useRouter()

    const { data, isLoading } = useGetProductDisplayById(params.id)
    const { mutateAsync: update } = useUpdateProductDisplay(params.id)

    const initialValues = {
        name: data?.name ?? '',
        description: data?.description ?? '',
        isInactive: data?.isInactive ?? false,
        products: data?.products ?? []
    }

    const { handleSubmit, reset, control, watch, getValues, setValue } = useForm<FormValues>({
        defaultValues: initialValues
    })

    const isInactive = watch('isInactive')
    const products = watch('products')

    const onSubmit = async (data: FormValues) => {
        try {
            const payload: UpdateProductDisplayPayload = {
                name: data.name,
                description: data.description,
                isInactive: data.isInactive,
                products: data.products
            }

            await update(payload)
            toast.success('Product display has been saved successfully.')
            router.back()
        } catch (error: any) {
            console.error(error)
            toast.error(error.toString())
        }
    }

    const dialog = useDialog()

    const onSaveProduct = () => {
        dialog.show({
            title: 'Select Product for Display',
            containerClassName: 'max-w-6xl',
            renderItem: (closeDialog) =>
                <ProductDialog
                    onProductSelected={(products) => setProductsToForm(products)}
                    onCompletedAction={closeDialog}
                    defaultData={products ?? []}
                />
        })
    }

    const setProductsToForm = (selectedProducts: ProductData[]) => {
        setValue('products', selectedProducts)
    }

    useEffect(() => {
        reset(initialValues)
    }, [data])

    return (
        <Container title="Edit Product Display">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <SectionContainer canGoBack title="Product Display Data">
                    {
                        isLoading ? <Loading /> :
                            <div className="flex flex-col gap-5">
                                <FormTextInput isRequired label="Product Display Name" name="name" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                                <FormTextInput label="Product Display Description" name="description" control={control} multiline />
                                <FormCheckboxInput label="Is Inactive?" name="isInactive" control={control} checked={isInactive} />
                            </div>
                    }
                </SectionContainer>
                <SectionContainer>
                    <FlexBox className="py-3">
                        <Button label={"Select Product"} className={'w-fit self-end'} onClick={onSaveProduct} />
                        {products.length == 0 ? <p className="text-center bg-slate-300 rounded-md p-3 font-bold">No Product added...</p>
                            :
                            <Table
                                columns={PROD_COLUMN}
                                data={products}
                            />
                        }
                    </FlexBox>
                </SectionContainer>
                <div className="flex justify-end gap-5 mt-3">
                    <Button className={'w-40'} label="Reset" onClick={() => reset()} />
                    <Button className={'w-40'} label="Save" type="submit" onClick={handleSubmit(onSubmit)} />
                </div>
            </form>
        </Container>
    )
}

export default EditProductDisplayPage