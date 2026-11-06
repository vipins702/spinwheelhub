import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpinningWheel from '../components/SpinningWheel'
import { getWheelTemplate } from '../data/wheelTemplates'

const colors = [
    '#FF3B30', '#34C759', '#007AFF', '#FFD60A', '#FF9500', '#AF52DE',
    '#FF2D92', '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482'
]

// Fit the frame: leave room for the wheel's glow at the sides, and for the title, controls and credit below
const getSize = () => Math.max(200, Math.min(520, window.innerWidth - 64, window.innerHeight - 190))

// Wheel only, for iframes on other sites. Served from embed.html, which has no ads or analytics.
const EmbedWheelPage: React.FC = () => {
    const { category } = useParams<{ category: string }>()
    const template = category ? getWheelTemplate(category) : undefined
    const [size, setSize] = useState(getSize)

    useEffect(() => {
        const onResize = () => setSize(getSize())
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const options = useMemo(
        () => (template?.options ?? []).map((text, i) => ({ id: `${i + 1}`, text, color: colors[i % colors.length] })),
        [template]
    )

    if (!template) {
        return <p className="p-6 text-center text-gray-600">This wheel is not available.</p>
    }

    return (
        <div className="flex flex-col items-center bg-white p-2 overflow-x-hidden min-h-screen">
            <h1 className="text-lg font-bold text-gray-900 mb-1 text-center">{template.title}</h1>
            <SpinningWheel options={options} size={size} />
            <a
                href={`https://spinwheelhub.org/wheel/${template.id}?utm_source=embed&utm_medium=iframe&utm_campaign=powered_by`}
                target="_blank"
                rel="noopener"
                className="mt-1 text-xs text-gray-500 hover:text-purple-700 underline"
            >
                Powered by SpinWheelHub
            </a>
        </div>
    )
}

export default EmbedWheelPage
