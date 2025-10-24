import { Spinner } from "./spinner";
import { ViewTransition, startTransition } from "react";
import "$style/fallback.scss"
import { useNavigate } from "react-router";
export const Fallback = () => {

    return (
        <div className="fallback">
            <ViewTransition name="app-logo" onEnter={() => {
                startTransition(() => { })
            }} onShare={() => {
                console.log("shared transition")
            }}>
                <Spinner />
            </ViewTransition>
        </div>
    );
}