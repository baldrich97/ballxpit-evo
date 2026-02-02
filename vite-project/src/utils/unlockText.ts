import type { UnlockCondition } from '../data/types'

export function getUnlockText(unlock: UnlockCondition): string {
    if (unlock.type === 'default') {
        return 'Unlocked by default'
    }

    if (unlock.type === 'clear_pit' && unlock.pitName) {
        return `Unlocked by clearing: ${unlock.pitName}`
    }

    return 'Unlock condition unknown'
}
