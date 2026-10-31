// Uniform random integer in [0, max) using the browser's crypto RNG when available
export const randomInt = (max: number): number => {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const buf = new Uint32Array(1)
        const limit = Math.floor(0x100000000 / max) * max
        let x: number
        do {
            crypto.getRandomValues(buf)
            x = buf[0]
        } while (x >= limit)
        return x % max
    }
    return Math.floor(Math.random() * max)
}

// Fisher–Yates shuffle
export const shuffle = <T,>(items: T[]): T[] => {
    const a = [...items]
    for (let i = a.length - 1; i > 0; i--) {
        const j = randomInt(i + 1)
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}
