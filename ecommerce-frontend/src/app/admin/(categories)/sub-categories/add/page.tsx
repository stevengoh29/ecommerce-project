'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormCheckboxInput from "@/components/input/form/form-checkbox-input"
import FormDropdownInput from "@/components/input/form/form-dropdown-input"
import FormImageUpload from "@/components/input/form/form-image-upload"
import FormTextInput from "@/components/input/form/form-text-input"
import { useGetMainCategoryOptions } from "@/hooks/category/main-category.query"
import { useCreateSubCategory } from "@/hooks/category/sub-category.mutation"
import { SubCategorySavePayload } from "@/services/categories/sub-category.service"
import uploadService from "@/services/uploads/upload.service"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    categoryName: string
    categoryDescription: string
    categoryImage: null | File
    mainCategoryUuid: string
    isInactive: boolean
}

const AddSubCategoryPage = () => {
    const { data, isLoading } = useGetMainCategoryOptions()
    const { mutateAsync: createSubCategory } = useCreateSubCategory()

    const router = useRouter()

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            categoryName: '',
            categoryDescription: '',
            categoryImage: null,
            mainCategoryUuid: '',
            isInactive: false
        }
    })

    const onSubmit = async (data: FormValues) => {
        try {
            const uploadedFilePath = await uploadService.uploadSingleFile(data.categoryImage)

            const subCategoryPayload: SubCategorySavePayload = {
                name: data.categoryName,
                description: data.categoryDescription,
                imagePath: uploadedFilePath ?? '',
                mainCategoryId: data.mainCategoryUuid,
                isInactive: data.isInactive
            }

            await createSubCategory(subCategoryPayload)
            toast.success('Subcategory has been created successfully')
            router.back()
        } catch (error: any) {
            console.error(error)
            toast.error(error.toString())
        }
    }

    return (
        <Container title="Add Sub Category">
            <SectionContainer canGoBack>
                <form className="flex flex-col gap-5">
                    <FormImageUpload name="categoryImage" control={control} />
                    <FormTextInput isRequired label="Category Name" name="categoryName" control={control} rules={{ required: { value: true, message: 'Field is required' } }} />
                    <FormTextInput label="Category Description" name="categoryDescription" control={control} multiline />
                    {data && <FormDropdownInput control={control} label="Main Category" name="mainCategoryUuid" options={data} />}
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

export default AddSubCategoryPage