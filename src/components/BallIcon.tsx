import { useState, type ReactNode } from 'react'
import { getBallImage } from '../utils/ballImages'

type Size = 'sm' | 'md' | 'lg'

const SIZE_CLASSES: Record<Size, string> = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
}

interface Props {
    id: string
    name: string
    description?: string
    size?: Size
    dimmed?: boolean
    selected?: boolean
    onClick?: () => void
    /** Optional overlay rendered in the top-right corner (e.g. an owned check). */
    badge?: ReactNode
    /** Show a hover tooltip with the name + description. Defaults to true. */
    tooltip?: boolean
}

export default function BallIcon({
    id,
    name,
    description,
    size = 'md',
    dimmed,
    selected,
    onClick,
    badge,
    tooltip = true,
}: Props) {
    const [hovered, setHovered] = useState(false)
    const src = getBallImage(id)

    const showTooltip = tooltip && hovered && (description || name)

    return (
        <div
            className={`
                group relative ${SIZE_CLASSES[size]} shrink-0
                ${onClick ? 'cursor-pointer' : ''}
                transition-all duration-200
                ${dimmed ? 'opacity-25' : 'opacity-100'}
                ${selected ? 'ring-2 ring-yellow-400 scale-105' : ''}
            `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            title={!tooltip ? name : undefined}
        >
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className="w-full h-full object-contain pixelated"
                    draggable={false}
                />
            ) : (
                <div
                    className="w-full h-full flex items-center justify-center rounded-md bg-[#5f3f38] text-[#f2e7e2] font-bold uppercase select-none"
                    aria-label={name}
                >
                    {name.slice(0, 2)}
                </div>
            )}

            {badge && (
                <div className="absolute -top-1 -right-1 z-10">{badge}</div>
            )}

            {showTooltip && (
                <div
                    className="
                        absolute left-1/2 top-full mt-2 -translate-x-1/2
                        w-56 max-w-[16rem]
                        bg-[#0e0e0e] text-[#f2f2f2]
                        border border-[#444] rounded-lg
                        shadow-[0_12px_32px_rgba(0,0,0,0.85)]
                        px-3 py-2 text-xs leading-relaxed
                        z-50 pointer-events-none
                    "
                >
                    <div
                        className="
                            absolute -top-1.5 left-1/2 -translate-x-1/2
                            w-0 h-0
                            border-l-8 border-r-8 border-b-8
                            border-l-transparent border-r-transparent
                            border-b-[#0e0e0e]
                        "
                    />
                    <div className="text-sm font-bold text-white mb-1">
                        {name}
                    </div>
                    {description && (
                        <div className="opacity-90">{description}</div>
                    )}
                </div>
            )}
        </div>
    )
}
