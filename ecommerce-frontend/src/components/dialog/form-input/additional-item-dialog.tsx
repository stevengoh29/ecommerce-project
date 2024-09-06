import Button from "@/components/button/button"
import FormTextInput from "@/components/input/form/form-text-input"
import { CreateAdditionalItemPayload } from "@/services/products/product.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as Yup from 'yup'

type FormValues = {
    name: string
    price: number
    stock: number
}

type Props = {
    defaultData?: CreateAdditionalItemPayload | null
    onCompletedAction: () => void
    onSave: (data: CreateAdditionalItemPayload) => void
}

const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    name: Yup.string().required(),
    price: Yup.number().typeError('Price must be a number').min(0, 'Price must be at least 0').required(),
    stock: Yup.number().typeError('Stock must be a number').min(0, 'Stock must be at least 0').required()
})

const AdditionalItemsDialog = (props: Props) => {
    const { handleSubmit, reset, control } = useForm<FormValues>({
        defaultValues: {
            name: props.defaultData?.name ?? '',
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
            <FormTextInput name="name" label="Additional Item Name" isRequired control={control} />
            <FormTextInput name="price" label="Price" control={control} isRequired type="number" />
            <FormTextInput name="stock" label="Stock" control={control} isRequired type="number" />
            <Button label="Save" onClick={handleSubmit(onSave)} />
            <Button label="Cancel" variant="danger" onClick={props.onCompletedAction} />
        </form>)
}

export default AdditionalItemsDialog