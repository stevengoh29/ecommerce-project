'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import FormTimePicker from "@/components/input/form/form-time-picker"
import Loading from "@/components/loading/loading"
import { useGetMainCategoryOptions } from "@/hooks/category/main-category.query"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useGetDetailedStore } from "@/hooks/stores/store.query"
import storeService, { UpdateStorePayload } from "@/services/stores/store.service"
import uploadService from "@/services/uploads/upload.service"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    name: string
    description: string
    openingHours: string
    closingHours: string
    isAlwaysOpen: boolean
    bannerImageUrl: string
    imageUrl: string | File | null
    mainCategoryUuid: string
}

const StoreView = () => {
    const { storeId } = useAppSelector(root => root.users)
    const { data, isLoading } = useGetDetailedStore(storeId ?? '')
    const { data: mainCategoryOptions } = useGetMainCategoryOptions()

    const [editMode, setEditMode] = useState(false)

    const initialValues = {
        name: data?.name,
        description: data?.description,
        openingHours: data?.openingHours,
        closingHours: data?.closingHours,
        isAlwaysOpen: data?.isAlwaysOpen,
        imageUrl: data?.imageUrl,
        mainCategoryUuid: data?.mainCategory?.uuid
    }

    const { handleSubmit, reset, control, watch, setValue } = useForm<FormValues>({
        defaultValues: initialValues,
        mode: "all",
    })

    const isAlwaysOpen = watch('isAlwaysOpen')

    const onSubmit = async (data: FormValues) => {
        try {
            console.log(data)
            const imageUrl = await uploadService.uploadSingleFile(data.imageUrl as File)

            const payload: UpdateStorePayload = {
                name: data.name,
                closingHours: data.closingHours,
                description: data.description,
                imageUrl: imageUrl,
                isAlwaysOpen: data.isAlwaysOpen,
                openingHours: data.openingHours
            }

            await storeService.update(storeId ?? '', payload)
            toast.success('Store has been updated successfully.')
            setEditMode(false)
        } catch (error: any) {
            console.error(error)
            toast.error(error.toString())
        }
    }

    useEffect(() => {
        setValue('openingHours', isAlwaysOpen ? '00:00' : '')
        setValue('closingHours', isAlwaysOpen ? '23:59' : '')
    }, [isAlwaysOpen, setValue, editMode])

    useEffect(() => {
        reset(initialValues)
    }, [data, editMode])

    useEffect(() => {
        if (editMode) reset(initialValues)
    }, [editMode])

    return (
        <Container title="Store Information">
            <SectionContainer>
                {
                    isLoading ? <Loading /> :
                        <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                            <FlexBox className="mb-5">
                                <FormImageUpload name="imageUrl" control={control} preview={data?.imageUrl as File ?? undefined} disabled={!editMode} />
                                <FormTextInput label="Store Name" name="name" control={control} disabled={!editMode} />
                                <FormTextInput label="Store Description" name="description" multiline control={control} disabled={!editMode} />
                                <FormDropdownInput label="Main Category" control={control} options={mainCategoryOptions ?? []} name="mainCategoryUuid" disabled={!editMode} />
                            </FlexBox>
                            {/* <Button label="Submit" type="submit" className={'w-full'} /> */}
                        </form>
                }
            </SectionContainer>
            <SectionContainer>
                {
                    isLoading ? <Loading /> :
                        <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                            <FlexBox className="mb-5">
                                <FormCheckboxInput label="Store always open" control={control} name="isAlwaysOpen" checked={isAlwaysOpen ?? false} disabled={!editMode} />
                                <FlexBox className="lg:flex-row">
                                    <FormTimePicker label='Opening Hours' name="openingHours" control={control} disabled={isAlwaysOpen} />
                                    <FormTimePicker label='Closing Hours' name="closingHours" control={control} disabled={isAlwaysOpen} />
                                </FlexBox>
                                {/* <FormTextInput label="Address" name="description" multiline control={control} disabled={!editMode} />
                                <FlexBox className="lg:flex-row">
                                    <FormTextInput label="PIC Name" name="description" control={control} disabled={!editMode} />
                                    <FormTextInput label="PIC Phone Number" name="description" control={control} disabled={!editMode} />
                                </FlexBox> */}
                            </FlexBox>
                        </form>
                }
            </SectionContainer>
            <FlexBox className="lg:flex-row justify-end">
                {editMode && <Button label={'Reset'} className={'w-full lg:w-fit self-end'} variant="danger" onClick={() => reset()} />}
                <Button label={editMode ? 'Save' : 'Edit'} className={'w-full lg:w-fit self-end'} onClick={editMode ? handleSubmit(onSubmit) : () => setEditMode(true)} />
            </FlexBox>
        </Container>
    )
}

export default StoreView