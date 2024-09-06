type Props = {
    imageSource: string
    className?: string
}

const ImageDisplay = (props: Props) => {
    const { imageSource, className } = props

    return (
        <div className={`w-20 h-20 rounded-lg ${className}`}>
            <img src={imageSource} alt={`uploaded ${imageSource}`} className="w-full h-full object-cover rounded-lg" />
        </div>
    )
}

export default ImageDisplay