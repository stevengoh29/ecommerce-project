import userService, { UserQueryParams } from "@/services/user/user.service"
import { useQuery } from "@tanstack/react-query"

export const useGetUsers = (params?: UserQueryParams) => {
    const exec = async (params?: UserQueryParams) => {
        const response = await userService.getAll(params)
        return response
    }

    const query = useQuery({
        queryKey: ['get-users', params],
        queryFn: () => exec(params)
    })

    return query
}

export const useGetUserStatusEnum = () => {
    const exec = async () => {
        const response = await userService.getStatusEnum()
        return response.length == 0 ? [] : response.map((opt) => ({ label: opt, value: opt }))
    }

    const query = useQuery({
        queryKey: ['get-users-status-enum'],
        queryFn: () => exec()
    })

    return query
}