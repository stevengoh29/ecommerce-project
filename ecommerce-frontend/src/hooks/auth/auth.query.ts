import authService from "@/services/auth/auth.service"
import { useQuery } from "@tanstack/react-query"

export const useGetAuthInfo = () => {
    const exec = async () => {
        const response = await authService.getProfile()
        return response
    }

    const query = useQuery({
        queryKey: ['get-profile'],
        queryFn: exec
    })

    return query
}