import classNames from "classnames"
import Button from "../button/button"
import { IoArrowBack } from "react-icons/io5"
import { useRouter } from "next/navigation"

type Props = {
    children: React.ReactNode
    className?: string
    canGoBack?: boolean
}

const SectionContainer = (props: Props) => {
    const { children, canGoBack = false, className } = props
    const router = useRouter()

    return (
        <>
            {canGoBack &&
                <div className="my-2" >
                    <div onClick={router.back} className="cursor-pointer flex w-fit gap-3">
                        <IoArrowBack size={24} />
                        <p>Cancel</p>
                    </div>
                </div>
            }
            <div className={classNames(`py-3 px-5 rounded-lg w-full shadow-main mb-3`, className)}>
                {children}
            </div>
        </>
    )
}

export default SectionContainer