'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import { useCreateMainCategory } from "@/hooks/category/main-category.mutation"
import mainCategoryService, { MainCategoryCreatePayload } from "@/services/categories/main-category.service"
import uploadService from "@/services/uploads/upload.service"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    categoryName: string
    categoryDescription: string
    categoryImage: null | File
    isInactive: boolean
}

const AddMainCategoryPage = () => {
    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            categoryName: '',
            categoryDescription: '',
            categoryImage: null,
            isInactive: false
        }
    })

    const { mutateAsync: createMainCategory } = useCreateMainCategory()

    const onSubmit = async (data: FormValues) => {
        try {
            const uploadedFilePath = await uploadService.uploadSingleFile(data.categoryImage)

            const mainCategoryPayload: MainCategoryCreatePayload = {
                name: data.categoryName,
                description: data.categoryDescription,
                imagePath: uploadedFilePath ?? '',
                isInactive: data.isInactive
            }

            await createMainCategory(mainCategoryPayload, { onSuccess: (data) => toast.success(`${data.uuid} has been created successfully`) })
        } catch (error: any) {
            console.error(error)
            toast.error(error.toString())
        }
    }

    return (
        <Container title="Add Main Category">
            <SectionContainer canGoBack>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormImageUpload name="categoryImage" control={control} />
                    <FormTextInput isRequired label="Category Name" name="categoryName" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                    <FormTextInput label="Category Description" name="categoryDescription" control={control} multiline />
                    <FormCheckboxInput label="Is Inactive" name="isInactive" control={control} />
                    <div className="flex justify-end gap-5 mt-2">
                        <Button className={'w-40'} label="Reset" onClick={() => reset()} />
                        <Button className={'w-40'} label="Save" type="submit" onClick={handleSubmit(onSubmit)} />
                    </div>
                </form>
            </SectionContainer>
        </Container>
    )
}

export default AddMainCategoryPage