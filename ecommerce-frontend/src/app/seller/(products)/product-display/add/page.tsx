'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormTextInput from "@/components/input/form/form-text-input"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useCreateProductDisplay } from "@/hooks/product-display/product-display.mutation"
import { SaveProductDisplayPayload } from "@/services/products/product-display.service"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    name: string
    description: string
    store: string
}

const AddProductDisplayPage = () => {
    const { storeId } = useAppSelector(root => root.users)
    const { mutateAsync: create } = useCreateProductDisplay()
    const router = useRouter()

    const initialValues = {
        name: '',
        description: '',
        store: storeId ?? ''
    }

    const { handleSubmit, reset, control } = useForm({
        defaultValues: initialValues
    })

    const onSubmit = async (data: FormValues) => {
        if (!data.store) return toast.error('Store is unknown. Please refresh and try again.')

        const payload: SaveProductDisplayPayload = {
            name: data.name,
            description: data.description,
            store: data.store
        }

        await create(payload)
        toast.success('Product display has been saved successfully.')
        router.back()
    }

    return (
        <Container title="Add Product Display">
            <SectionContainer canGoBack>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormTextInput isRequired label="Product Display Name" name="name" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                    <FormTextInput label="Product Display Description" name="description" control={control} multiline />
                    <div className="flex justify-end gap-5 mt-2">
                        <Button className={'w-40'} label="Reset" onClick={() => reset()} />
                        <Button className={'w-40'} label="Save" type="submit" onClick={handleSubmit(onSubmit)} />
                    </div>
                </form>
            </SectionContainer>
        </Container>
    )
}

export default AddProductDisplayPage