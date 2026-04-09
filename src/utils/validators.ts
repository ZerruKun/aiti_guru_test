// Валидация значений
export const validators = {
  isRequired: (value: string, message: string): string | undefined => {
    if (!value || !value.trim()) return message;
    return undefined;
  },

  isNumber: (value: string, message: string): string | undefined => {
    if (!value || isNaN(Number(value))) return message;
    return undefined;
  },

  isInRange: (
    value: number,
    min: number,
    max: number,
    message: string
  ): string | undefined => {
    if (value < min || value > max) return message;
    return undefined;
  },
};