import { ALL_BALLS, getBall } from './registry'
import { EVOLVED_BALLS } from './evolvedBalls'
import { hasBallImage } from '../utils/ballImages'

export interface ValidationResult {
    errors: string[]
    warnings: string[]
}

/**
 * Sanity-checks the hand-authored ball data:
 *  - every ball id is unique
 *  - every recipe ingredient resolves to a known ball
 *  - (warning) every ball has an icon asset
 */
export function validateData(): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Unique ids
    const seen = new Set<string>()
    for (const ball of ALL_BALLS) {
        if (seen.has(ball.id)) {
            errors.push(`Duplicate ball id: "${ball.id}"`)
        }
        seen.add(ball.id)
    }

    // Recipe ingredients must resolve
    for (const ball of EVOLVED_BALLS) {
        for (const recipe of ball.recipes) {
            for (const req of recipe.requires) {
                const ids = Array.isArray(req) ? req : [req]
                for (const id of ids) {
                    if (!getBall(id)) {
                        errors.push(
                            `Recipe for "${ball.id}" references unknown ball "${id}"`,
                        )
                    }
                }
            }
        }
    }

    // Icons (warning only - fallback rendering covers missing ones)
    for (const ball of ALL_BALLS) {
        if (!hasBallImage(ball.id)) {
            warnings.push(`Missing icon for "${ball.id}" (${ball.name})`)
        }
    }

    return { errors, warnings }
}

/** Logs validation results to the console. Intended for dev builds. */
export function logDataValidation(): void {
    const { errors, warnings } = validateData()

    if (errors.length) {
        console.error(
            `[ballxpit data] ${errors.length} error(s):\n` +
                errors.map(e => `  - ${e}`).join('\n'),
        )
    }
    if (warnings.length) {
        console.warn(
            `[ballxpit data] ${warnings.length} warning(s):\n` +
                warnings.map(w => `  - ${w}`).join('\n'),
        )
    }
    if (!errors.length && !warnings.length) {
        console.info('[ballxpit data] validation passed with no issues')
    }
}
