import React, { useEffect, useState } from 'react';

import { ModalDialog, Spinner } from '@edx/paragon';
import { connect, useSelector } from 'react-redux';
import { injectIntl, useIntl } from '@edx/frontend-platform/i18n';
import messages from './PaymentProcessingModal.messages';
import { paymentProcessStatusIsPollingSelector, paymentProcessStatusSelector } from './data/selectors';
import { PAYMENT_STATE } from './data/constants';

/**
 * Determine if the Dialog should be open based on Rebux state input
 * @param s {PAYMENT_STATE} The value of the payment state as we currently know it
 * @param p {boolean} is currently polling/still polling for status
 * @return {boolean}
 */
const shouldBeOpen = (s, p) => p || s === PAYMENT_STATE.PROCESSING;

/**
 * PaymentProcessingModal
 *
 * This modal is controlled primarily by some Redux selectors.
 * @see paymentProcessStatusSelector
 * @see paymentProcessStatusIsPollingSelector
 */
export const PaymentProcessingModal = () => {
  const intl = useIntl();

  const status = useSelector(paymentProcessStatusSelector);
  const isPolling = useSelector(paymentProcessStatusIsPollingSelector);
  const [isOpen, setOpen] = useState(shouldBeOpen(status, isPolling));

  useEffect(() => {
    setOpen(shouldBeOpen(status, isPolling));
  }, [status, isPolling]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalDialog
      title="Your Payment is Processing"
      isOpen={isOpen}
      onClose={() => {
      }}
      hasCloseButton={false}
      isFullscreenOnMobile={false}
    >
      <ModalDialog.Header>
        <ModalDialog.Title as="h3">
          {
                        intl.formatMessage(messages['payment.processing.modal.message'])
                    }
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        <div className="text-center">
          <Spinner
            animation="border"
            screenReaderText={intl.formatMessage(messages['payment.processing.modal.sr.spinner-text'])}
          />
        </div>
      </ModalDialog.Body>
    </ModalDialog>
  );
};

export default connect()(injectIntl(PaymentProcessingModal));
