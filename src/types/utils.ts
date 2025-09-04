/**
 * Utility types for the application
 * These should be explicitly imported where needed, not global
 */

// Result type for functional programming patterns
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

// Optional type for values that might not exist
export type Optional<T> = T | null | undefined;

// Nullable type
export type Nullable<T> = T | null;

// Make all properties of T optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific properties of T required
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Extract keys from T that have values assignable to U
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Create a type with all properties non-nullable
export type NonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// Helper for creating branded types (nominal typing)
export type Brand<T, U> = T & { __brand: U };

// Example usage: type UserId = Brand<string, 'UserId'>;
