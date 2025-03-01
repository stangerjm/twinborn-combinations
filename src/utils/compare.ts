export function includes(term1: string, term2: string) {
  return term1.toLowerCase().trim().includes(term2.toLowerCase().trim());
}

export function equals(term1: string, term2: string) {
  return term1.toLowerCase().trim() === term2.toLowerCase().trim();
}
