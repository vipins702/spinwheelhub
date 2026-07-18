declare global {
    interface Window {
        ezstandalone: {
            cmd: Array<() => void>;
            showAds: (placeholderId: number) => void;
            define: (placeholderIds: number[]) => void;
            refresh: () => void;
            hasAd: (placeholderId: number) => boolean;
        };
    }
}

export { };
