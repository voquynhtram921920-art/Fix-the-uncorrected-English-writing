
export interface Correction {
  type: string;
  explanation: string;
}

export interface CorrectionResult {
  corrections: Correction[];
  correctedText: string;
}
