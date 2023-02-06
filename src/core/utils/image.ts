export const prepareImageSrc = (src: string, size: number): string => src.replace('{size}', `${size}x${size}`)
