"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GlobalProvider } from "@/contexts/GlobalContext";

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider {...props}>
            <GlobalProvider>
                {children}
            </GlobalProvider>
        </NextThemesProvider>
    );
}
