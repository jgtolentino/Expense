export const PROJECT_CODES = [
  { code: 'JUICE-001', name: 'Juice Project Phase 1' },
  { code: 'JUICE-002', name: 'Juice Project Phase 2' },
  { code: 'CC-001', name: 'Creative Campaign Q1' },
  { code: 'CC-002', name: 'Creative Campaign Q2' },
  { code: 'BOLT-001', name: 'Bolt Initiative Phase 1' },
  { code: 'BOLT-002', name: 'Bolt Initiative Phase 2' },
  { code: 'PRPRINT-001', name: 'Print Media Campaign Q1' },
  { code: 'PRPRINT-002', name: 'Print Media Campaign Q2' }
] as const;

export type ProjectCode = typeof PROJECT_CODES[number]['code'];