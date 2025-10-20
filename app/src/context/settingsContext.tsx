import React, { createContext, useState } from "react";

export type UserSettings = {
    theme: "light" | "dark";
    shownOnbarding: boolean;
    archive: Record<string, any>[];
}
const defaultSettings: UserSettings = {
    archive: [],
    shownOnbarding: true,
    theme: "light"
}

export const SettingsContext = createContext({
    settings: defaultSettings,
    saveSettings: (values: UserSettings) => {},
})

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
    const rawSettings = localStorage.getItem("user_settings")
    var settings;
    if(rawSettings) {
        try {
            settings = {
                ...defaultSettings,
                ...JSON.parse(rawSettings) as UserSettings
            }

        } catch (error) {
            console.warn(`failed parse settings with error ${error}\n\n with data`, rawSettings)
        }
    }

    const [currentSettings, setCurrentSettings] = useState(
        settings || defaultSettings
    )

    const saveSettings = (values: UserSettings) => {
        window.localStorage.setItem("user_settings", JSON.stringify(values))
        setCurrentSettings(values)
    }

    return(
        <SettingsContext.Provider value={{settings: currentSettings, saveSettings}}>
            {children}
        </SettingsContext.Provider>
    )
}