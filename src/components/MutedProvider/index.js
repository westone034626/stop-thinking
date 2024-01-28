import React, { createContext, useMemo, useReducer } from 'react';

export const MutedContext = createContext(false);

function MutedProvider({ children }) {
    const [muted, toggleMuted] = useReducer((s) => !s, false);

    const mutedContext = useMemo(
        () => ({
            muted,
            toggleMuted,
        }),
        [muted],
    );

    return <MutedContext.Provider value={mutedContext}>{children}</MutedContext.Provider>;
}

export default MutedProvider;
