interface Props {
    owned: boolean
    onChange: (owned: boolean) => void
    label?: string
}

export function CheckBadge() {
    return (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow ring-2 ring-white">
            <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                />
            </svg>
        </span>
    )
}

export default function OwnedToggle({ owned, onChange, label = 'Owned' }: Props) {
    return (
        <button
            type="button"
            onClick={() => onChange(!owned)}
            aria-pressed={owned}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium transition-colors ${
                owned
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-black/10 text-stone-800 hover:bg-black/20'
            }`}
        >
            <span
                className={`flex h-4 w-4 items-center justify-center rounded border ${
                    owned
                        ? 'border-white bg-white/20'
                        : 'border-stone-500 bg-transparent'
                }`}
            >
                {owned && (
                    <svg
                        viewBox="0 0 20 20"
                        className="h-3 w-3"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </span>
            {owned ? label : `Mark ${label}`}
        </button>
    )
}
