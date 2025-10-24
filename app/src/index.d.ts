import React from "react";

declare module "react" {
    interface ViewTransitionProps {
        name?: string; // name for shared element transitions
        enter?: string; // CSS class for enter animation
        exit?: string;  // CSS class for exit animation
        update?: string; // CSS class for update animation
        share?: string; // CSS class for shared element animation
        default?: string; // CSS class for default animation
        onEnter?: (instance: any) => void; // Imperative animation callback
        onExit?: (instance: any) => void;
        onShare?: (instance: any) => void;
        onUpdate?: (instance: any) => void;
        children?: React.ReactNode;
    }

    export const ViewTransition: React.ExoticComponent<ViewTransitionProps>;
}