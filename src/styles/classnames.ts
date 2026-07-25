export type ClassValue = string | false | null | undefined;

/** Joins public component classes without introducing a runtime styling dependency. */
export const cx = (...values: ClassValue[]) => values.filter(Boolean).join(' ');
