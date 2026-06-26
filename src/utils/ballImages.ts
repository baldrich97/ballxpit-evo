// Build-safe resolution of ball sprite assets.
//
// Vite's `import.meta.glob` turns every PNG under `src/assets/balls` into a
// hashed, production-safe URL at build time. We key them by their file name
// (the ball id) so components can look up an icon by id.
//
// Any ball whose icon hasn't been added yet simply resolves to `undefined`,
// and `BallIcon` renders a text fallback instead of a broken image.

const modules = import.meta.glob('../assets/balls/*.png', {
    eager: true,
    import: 'default',
}) as Record<string, string>

const BALL_IMAGE_MAP: Record<string, string> = {}

for (const [path, url] of Object.entries(modules)) {
    const fileName = path.split('/').pop() ?? ''
    const id = fileName.replace(/\.png$/, '')
    if (id) BALL_IMAGE_MAP[id] = url
}

export function getBallImage(id: string): string | undefined {
    return BALL_IMAGE_MAP[id]
}

export function hasBallImage(id: string): boolean {
    return id in BALL_IMAGE_MAP
}
