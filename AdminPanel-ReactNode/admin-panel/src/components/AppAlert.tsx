import { CAlert } from "@coreui/react"
import { IMessage } from "../hooks/useAlert"

const AppAlert = ({ message, type }: IMessage) => {

    if (message) return (
        <CAlert color={type === "error" ? "danger" : type} dismissible >
            {message}
        </CAlert >
    )
    return <></>
}

export default AppAlert