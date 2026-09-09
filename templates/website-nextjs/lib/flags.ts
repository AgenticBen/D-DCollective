/**
 * Single place for undecided publishing questions.
 * Flip a flag here and the pages follow; nothing else reads these values.
 */
export const flags = {
  /**
   * Show "at market / above market / concessionary" next to each portfolio
   * holding. Off until Michele and Eric decide whether to publish posture.
   */
  showReturnPosture: false
} as const;
