export const ORDER_TYPES = {
  BULK_ENROLLMENT: 'Enrollment Code',
  ENTITLEMENT: 'Course Entitlement',
  SEAT: 'Seat',
};

export const CERTIFICATE_TYPES = {
  VERIFIED: 'verified',
  CREDIT: 'credit',
};

/**
 * Payment State for async payment processing and UI Dialog Control.
 *
 * @type {{
 *  COMPLETED: string,
 *  FAILED: string,
 *  CHECKOUT: string,
 *  PROCESSING: string,
 *  PENDING: string,
 *  DEFAULT: string,
 *  FORCE_PROCESSING: string
 * }}
 */
export const PAYMENT_STATE = (((base = {
  // The enum as the WS Sees it.
  CHECKOUT: 'checkout',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PENDING: 'pending',
  PROCESSING: 'processing',
}) => ({
  // Our Additions
  ...base,

  /**
   * Default according to Redux initial state.
   * @see PAYMENT_STATE.CHECKOUT
   */
  DEFAULT: base.CHECKOUT,

  /**
   * This is a custom UI state. It enforces the processing dialog before any state is returned.
   */
  FORCE_PROCESSING: 'ui_forced_processing',
}))());
