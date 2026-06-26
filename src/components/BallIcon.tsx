import { useState } from 'react'

interface Props {
    id: string
    name: string
    description: string
    dimmed?: boolean
    selected?: boolean
    onClick?: () => void
}

export default function BallIcon({
                                     id,
                                     name,
                                     description,
                                     dimmed,
                                     selected,
                                     onClick,
                                 }: Props) {
    const [hovered, setHovered] = useState(false)

    return (
        <div
            className={`
                relative w-16 h-16 cursor-pointer
                transition-all duration-200
                ${dimmed ? 'opacity-25' : 'opacity-100'}
                ${selected ? 'ring-2 ring-yellow-400 scale-105' : ''}
            `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <img
                src={`/src/assets/balls/${id}.png`}
                alt={name}
                className="w-full h-full object-contain pixelated"
                draggable={false}
            />

            {/* Tooltip */}
        {/*    {hovered && (*/}
        {/*        <div*/}
        {/*            className="*/}
        {/*    absolute*/}
        {/*    left-1/2 top-full mt-4 -translate-x-1/2*/}

        {/*    w-[420px] max-w-[420px]*/}

        {/*    bg-[#0e0e0e]*/}
        {/*    text-[#f2f2f2]*/}

        {/*    border border-[#444]*/}
        {/*    rounded-lg*/}

        {/*    shadow-[0_12px_32px_rgba(0,0,0,0.85)]*/}
        {/*    px-4 py-3*/}

        {/*    text-sm leading-relaxed*/}

        {/*    z-[9999]*/}
        {/*    pointer-events-none*/}
        {/*"*/}
        {/*        >*/}
        {/*            /!* Arrow *!/*/}
        {/*            <div*/}
        {/*                className="*/}
        {/*        absolute -top-2 left-1/2 -translate-x-1/2*/}
        {/*        w-0 h-0*/}
        {/*        border-l-8 border-r-8 border-b-8*/}
        {/*        border-l-transparent border-r-transparent*/}
        {/*        border-b-[#0e0e0e]*/}
        {/*    "*/}
        {/*            />*/}

        {/*            /!* Title *!/*/}
        {/*            <div className="text-base font-bold text-white mb-2">*/}
        {/*                {name}*/}
        {/*            </div>*/}

        {/*            /!* Description *!/*/}
        {/*            <div className="opacity-90">*/}
        {/*                {description}*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    )}*/}



        </div>
    )
}
