'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import Container from "@/components/container/root-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import FormTimePicker from "@/components/input/form/form-time-picker"
import { useGetMainCategoryOptions } from "@/hooks/category/main-category.query"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useCreateStore } from "@/hooks/stores/store.mutation"
import { SaveStorePayload } from "@/services/stores/store.service"
import uploadService from "@/services/uploads/upload.service"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"


type FormValues = {
    name: string
    description: string
    openingHours: string
    closingHours: string
    mainCategoryUuid: string
    isAlwaysOpen: boolean
    imageUrl: null | File
}

const RegisterSellerStore = () => {
    const { firstName, uuid } = useAppSelector(root => root.users)
    const { mutateAsync: createStore } = useCreateStore()
    const { data: options } = useGetMainCategoryOptions()
    const router = useRouter()

    const { handleSubmit, control, reset, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            name: '',
            description: '',
            openingHours: '',
            closingHours: '',
            mainCategoryUuid: '',
            isAlwaysOpen: false,
            imageUrl: null
        }
    })

    const isAlwaysOpen = watch('isAlwaysOpen')

    useEffect(() => {
        setValue('openingHours', isAlwaysOpen ? '00:00' : '')
        setValue('closingHours', isAlwaysOpen ? '23:59' : '')
    }, [isAlwaysOpen, setValue])

    const onSubmit = async (data: FormValues) => {
        try {
            const imageUrl = await uploadService.uploadSingleFile(data.imageUrl)
            const payload: SaveStorePayload = {
                name: data.name,
                description: data.description,
                isAlwaysOpen: data.isAlwaysOpen,
                openingHours: data.openingHours,
                closingHours: data.closingHours,
                imageUrl: imageUrl,
                owner: uuid,
                mainCategoryUuid: data.mainCategoryUuid
            }

            await createStore(payload)
            reset()
            toast.success('Store has been created')
            router.push('/seller')
        } catch (error: any) {
            console.error(error)
            if (error instanceof AxiosError) return toast.error(error?.response?.data.message)
            return toast.error(error?.message.toString())
        }
    }

    return (
        <Container className="justify-center items-center">
            <SectionContainer className="lg:w-[48rem] lg:px-10 py-10">
                <h2 className="text-xl font-bold text-center">Hi, {firstName}. Setup your store.</h2>
                <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                    <FlexBox className="mb-5">
                        <FormImageUpload name="imageUrl" control={control} />
                        <FormTextInput label="Store Name" name="name" control={control} />
                        <FormTextInput label="Store Description" name="description" multiline control={control} />
                        <FormCheckboxInput label="Store always open" control={control} name="isAlwaysOpen" checked={isAlwaysOpen} />
                        <FlexBox className="lg:flex-row">
                            <FormTimePicker label='Opening Hours' name="openingHours" control={control} disabled={isAlwaysOpen} />
                            <FormTimePicker label='Closing Hours' name="closingHours" control={control} disabled={isAlwaysOpen} />
                        </FlexBox>
                        <FormDropdownInput
                            label="Main Category"
                            name="mainCategoryUuid"
                            options={options ?? []}
                            control={control}
                        />
                    </FlexBox>
                    <Button label="Submit" type="submit" className={'w-full'} onClick={handleSubmit(onSubmit)} />
                </form>
            </SectionContainer>
        </Container>
    )
}

export default RegisterSellerStore