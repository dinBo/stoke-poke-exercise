export const getSectionId = (step, section) => `${step.id}_${section.id}`

export const roundTo2Digits = (num) => Math.round((num + Number.EPSILON) * 100) / 100