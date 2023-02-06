export const getKeys = <T extends object>(obj: T): (keyof T)[] => Object.keys(obj) as Array<keyof T>
