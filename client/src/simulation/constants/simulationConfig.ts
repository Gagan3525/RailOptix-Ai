export const SIMULATION_CONFIG = {
  // Simulation tick interval
  TICK_RATE_MS: 100,

  // Position increase multiplier
  POSITION_INCREMENT: 0.02,

  // Default train values
  DEFAULT_SPEED: 80,
  DEFAULT_MAX_SPEED: 110,

  // Railway limits
  MAX_DELAY_MINUTES: 120,

  // AI
  AI_CONFIDENCE_THRESHOLD: 0.85,
} as const;