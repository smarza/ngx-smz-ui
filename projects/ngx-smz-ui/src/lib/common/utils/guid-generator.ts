export function generateGUID(): string {
  // If the crypto API is available, use it for secure random numbers
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);

    // Set the version to 4 => UUID version 4
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    // Set the variant to 10xxxxxx
    buffer[8] = (buffer[8] & 0x3f) | 0x80;

    // Convert buffer to hexadecimal format and insert dashes
    const hexValues = Array.from(buffer, byte => byte.toString(16).padStart(2, '0'));
    return `${hexValues.slice(0, 4).join('')}-${hexValues.slice(4, 6).join('')}-${hexValues.slice(6, 8).join('')}-${hexValues.slice(8, 10).join('')}-${hexValues.slice(10, 16).join('')}`;
  } else {
    // Fallback: use Math.random (less secure)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
