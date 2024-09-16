import { useParams } from "next/navigation";

export const useGetIdByParams = () => {
    const params = useParams<{ id: string }>()
    return params.id
}