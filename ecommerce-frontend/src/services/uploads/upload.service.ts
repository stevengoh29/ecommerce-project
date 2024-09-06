import { API_PATH } from "@/core/api/api-listing"
import ApiService from "@/core/api/api.service"

class UploadService {
    async uploadSingleFile(imageFile: File | null): Promise<string | null> {
        const formData = new FormData()
        formData.append('file', imageFile ?? '')

        const response = await ApiService.post(
            API_PATH.uploads.single,
            formData,
            { 'Content-Type': 'multipart/form-data' }
        )

        if (response.status == 201) return response.data.filePath
        return null
    }

    async uploadMultipleFile(imageFiles: File[]): Promise<string[] | []> {
        const formData = new FormData()

        imageFiles.forEach((imageFile) => {
            formData.append('files', imageFile)
        })

        const response = await ApiService.post(
            API_PATH.uploads.multiple,
            formData,
            { 'Content-Type': 'multipart/form-data' }
        )

        if (response.status == 201) return response.data.filePath
        return []
    }
}

export default new UploadService()