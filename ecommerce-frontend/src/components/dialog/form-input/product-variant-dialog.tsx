import Button from "@/components/button/button"
import FormTextInput from "@/components/input/form/form-text-input"
import { CreateProductVariantPayload } from "@/services/products/product.service"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
    name: string
    description?: string
    sku: string
    image?: string
    price: number
    stock: number
}

type Props = {
    defaultData?: CreateProductVariantPayload | null
    onCompletedAction: () => void
    onSave: (data: CreateProductVariantPayload) => void
}

const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().optional(),
    sku: Yup.string().required(),
    image: Yup.string().optional(),
    price: Yup.number().typeError('Price must be a number').min(0, 'Price must be at least 0').required(),
    stock: Yup.number().typeError('Stock must be a number').min(0, 'Stock must be at least 0').required()
})

const ProductVariantDialog = (props: Props) => {
    const { handleSubmit, reset, control } = useForm<FormValues>({
        defaultValues: {
            name: props.defaultData?.name ?? '',
            description: props.defaultData?.description ?? '',
            sku: props.defaultData?.sku ?? '',
            price: props.defaultData?.price ?? 0,
            stock: props.defaultData?.stock ?? 0
        },
        resolver: yupResolver(validationSchema)
    })

    const onSave = (data: FormValues) => {
        toast.success('Product variant has been saved.')
        props.onSave(data)
        props.onCompletedAction()
    }

    return (
        <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-3 mt-3">
            <FormTextInput name="name" label="Product Variant Name" isRequired control={control} />
            <FormTextInput name="description" label="Product Variant Description" multiline control={control} />
            <FormTextInput name="sku" label="Product Variant SKU" isRequired control={control} />
            <FormTextInput name="price" label="Price" control={control} isRequired type="number" />
            <FormTextInput name="stock" label="Stock" control={control} isRequired type="number" />
            <Button label="Save" onClick={handleSubmit(onSave)} />
            <Button label="Cancel" variant="danger" onClick={props.onCompletedAction} />
        </form>
    )
}

export default ProductVariantDialog