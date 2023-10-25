export function sanitize(fileName: string): string {
    const sanitizedName = fileName
      .replace(/[^\w\s.-]/g, '') // Supprime les caractères spéciaux sauf les espaces, les points et les tirets
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-') // Supprime les tirets consécutifs
  
    return sanitizedName;
  }