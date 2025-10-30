import { api } from "convex/_generated/api";
import { useMutation, useQueries, useQuery } from "convex/react";
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
    saveSettings: (_values: UserSettings) => { },
})

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {

    const rawSettings = localStorage.getItem("user_settings")
    var settings;

    if (api.auth.isAuthenticated) {
        const remoteSettings = useQuery(api.settings.get);
        if (remoteSettings) {
            settings = {
                ...defaultSettings,
                ...remoteSettings
            }
        }
    } else {
        if (rawSettings) {
            try {
                settings = {
                    ...defaultSettings,
                    ...JSON.parse(rawSettings) as UserSettings
                }

            } catch (error) {
                console.warn(`failed parse settings with error ${error}\n\n with data`, rawSettings)
            }
        }
    }

    const [currentSettings, setCurrentSettings] = useState(
        settings || defaultSettings
    )

    const saveSettings = async (values: UserSettings) => {
        if(api.auth.isAuthenticated) {
            const mutateSetttings = useMutation(api.settings.set);
            await mutateSetttings({
                theme: values.theme,
                shownOnbarding: values.shownOnbarding,
            })
            setCurrentSettings(values)
            return
        }
        window.localStorage.setItem("user_settings", JSON.stringify(values))
        setCurrentSettings(values)
    }

    return (
        <SettingsContext.Provider value={{ settings: currentSettings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}