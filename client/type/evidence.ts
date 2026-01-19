export type EvidenceSource = {
  id: string;
  title: string;
  snippet: string;
  url?: string;
};

export type EvidenceTrailData = {
  claim: string;
  confidence: number;
  verdict: 'true' | 'false' | 'misleading' | 'unknown';
  summary: string;
  evidence: EvidenceSource[];
};


export type PropagationNode = {
  id: string;
  date: string;          // "March 2020"
  source: string;        // "Health Blog"
  description: string;
  badge?: {
    label: string;
    color: string;
    textColor: string;
  };
  status?: {
    label: string;
    color: string;
  };
  isOrigin?: boolean;
};

export type SpreadNode = {
  id: string;
  date: string;
  platform: string;
  reach: string;
  content: string;
  type: 'origin' | 'spread' | 'variant';
};

