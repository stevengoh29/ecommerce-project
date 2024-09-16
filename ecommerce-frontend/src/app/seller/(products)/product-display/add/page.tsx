'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import ProductDialog from "@/components/dialog/form-input/product-dialog"
import FormTextInput from "@/components/input/form/form-text-input"
import Table, { TableColumnType } from "@/components/table/table"
import useDialog from "@/hooks/common/use-dialog.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useCreateProductDisplay } from "@/hooks/product-display/product-display.mutation"
import { SaveProductDisplayPayload } from "@/services/products/product-display.service"
import { ProductData } from "@/services/products/product.service"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    name: string
    description: string
    store: string
    products: ProductData[]
}

const PROD_COLUMN = [
    { key: 'uuid', label: '# Id', width: 'w-32', type: 'LINK' as TableColumnType },
    { key: 'imageUrl', label: 'Image', width: 'w-9', type: 'IMAGES' as TableColumnType },
    { key: 'name', label: 'Product Name', width: 'w-48' },
    { key: 'subCategory.name', label: 'Subcategory Name', width: 'w-48' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: 'BOOL' as TableColumnType },
]

const AddProductDisplayPage = () => {
    const { storeId } = useAppSelector(root => root.users)
    const { mutateAsync: create } = useCreateProductDisplay()
    const router = useRouter()

    const initialValues = {
        name: '',
        description: '',
        store: storeId ?? '',
        products: []
    }


    const { handleSubmit, reset, control, watch, setValue, getValues } = useForm<FormValues>({
        defaultValues: initialValues
    })

    const products = watch('products')

    const dialog = useDialog()

    const setProductsToForm = (selectedProducts: ProductData[]) => {
        setValue('products', selectedProducts)
    }

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

    const onSubmit = async (data: FormValues) => {
        if (!data.store) return toast.error('Store is unknown. Please refresh and try again.')

        const payload: SaveProductDisplayPayload = {
            name: data.name,
            description: data.description,
            store: data.store,
            products: data.products
        }

        await create(payload)
        toast.success('Product display has been saved successfully.')
        router.back()
    }

    return (
        <Container title="Add Product Display">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <SectionContainer canGoBack className="py-5">
                    <FlexBox>
                        <FormTextInput isRequired label="Product Display Name" name="name" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                        <FormTextInput label="Product Display Description" name="description" control={control} multiline />
                    </FlexBox>
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
                <div className="flex justify-end gap-5 mt-2">
                    <Button className={'w-40'} label="Reset" onClick={() => reset()} />
                    <Button className={'w-40'} label="Save" type="submit" onClick={handleSubmit(onSubmit)} />
                </div>
            </form>
        </Container>
    )
}

export default AddProductDisplayPage