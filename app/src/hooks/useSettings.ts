import { useContext } from "react"
import { SettingsContext } from "../context/settingsContext"

export default () => {
    const context = useContext(SettingsContext)

    return context
}