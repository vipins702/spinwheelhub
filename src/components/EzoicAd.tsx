import React, { useEffect, useRef } from 'react';

interface EzoicAdProps {
    placeholderId: number;
    className?: string;
}

/**
 * EzoicAd Component
 * 
 * Safely renders an Ezoic ad placement.
 * Usage: <EzoicAd placeholderId={101} />
 */
const EzoicAd: React.FC<EzoicAdProps> = ({ placeholderId, className = '' }) => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ensure ezstandalone is available
        if (typeof window !== 'undefined' && window.ezstandalone) {
            try {
                window.ezstandalone.cmd.push(() => {
                    // Define and show the ad
                    window.ezstandalone.define(placeholderId);
                    window.ezstandalone.showAds(placeholderId);
                });
            } catch (error) {
                console.warn('Ezoic Ad Error:', error);
            }
        }
    }, [placeholderId]);

    return (
        <div className={`ezoic-ad-container my-4 flex justify-center ${className}`}>
            {/* The actual placeholder div required by Ezoic */}
            <div id={`ezoic-pub-ad-placeholder-${placeholderId}`} ref={adRef}></div>
        </div>
    );
};

export default EzoicAd;
