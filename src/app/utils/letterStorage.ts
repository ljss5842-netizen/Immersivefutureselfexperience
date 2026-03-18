export interface Letter {
  id: string;
  message: string;
  response: string;
  createdAt: string;
}

const STORAGE_KEY = 'future_me_letters';

export function saveNewLetter(message: string, response: string): Letter {
  const letters = getLetters();
  const newLetter: Letter = {
    id: Date.now().toString(),
    message,
    response,
    createdAt: new Date().toISOString(),
  };
  
  letters.push(newLetter);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
  
  return newLetter;
}

export function getLetters(): Letter[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getLetter(id: string): Letter | null {
  const letters = getLetters();
  return letters.find(letter => letter.id === id) || null;
}
