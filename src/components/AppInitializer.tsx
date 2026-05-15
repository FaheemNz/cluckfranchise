"use client";

import { useEffect } from "react";
import { globalDataManager } from "@/src/services/globalDataManager";

export default function AppInitializer() {

    useEffect(() => {
        globalDataManager.fetchAllData();
    }, []);

    return null;
}