import { IMAGE_SERVE_DIR } from "src/config/application.config"

class ConverterUtil {
    convertImagePathName(pathname: string) {
        if (pathname == '') return ''
        const path = pathname.split('\\')
        return `${IMAGE_SERVE_DIR}/${path.slice(-1).at(0)}`
    }
}

export default new ConverterUtil()