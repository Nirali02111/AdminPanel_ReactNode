import React from "react"
interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}
const AppImage: React.FC<AppImageProps> = ({ src, alt, ...rest }) => {
    if (src && src?.trim()) {
        if (src.startsWith('assets/images/users/')) {
            return <a href={process.env.REACT_APP_API_SERVER_URL + '/' + src} target="_blank" rel="noreferrer"><img src={process.env.REACT_APP_API_SERVER_URL + '/' + src} alt={alt} {...rest} /></a>
        }
        return <a href={src} target="_blank" rel="noreferrer"><img src={src} alt={alt} {...rest} /></a>
    }
    return <></>
}

export default AppImage