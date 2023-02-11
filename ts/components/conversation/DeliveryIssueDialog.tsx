// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as React from 'react';

import { Button, ButtonSize, ButtonVariant } from '../Button';
import type { ConversationType } from '../../state/ducks/conversations';
import { Modal } from '../Modal';
import { Intl } from '../Intl';
import { Emojify } from './Emojify';

import { useRestoreFocus } from '../../hooks/useRestoreFocus';

import type { LocalizerType } from '../../types/Util';
import { openLinkInWebBrowser } from '../../util/openLinkInWebBrowser';

export type PropsType = {
  i18n: LocalizerType;
  sender: ConversationType;
  inGroup: boolean;
  onClose: () => unknown;
};

export function DeliveryIssueDialog(props: PropsType): React.ReactElement {
  const { i18n, inGroup, sender, onClose } = props;

  // Focus first button after initial render, restore focus on teardown
  const [focusRef] = useRestoreFocus();

  const footer = (
    <>
      <Button
        onClick={() =>
          openLinkInWebBrowser(
            'https://support.signal.org/hc/articles/4404859745690'
          )
        }
        size={ButtonSize.Medium}
        variant={ButtonVariant.Secondary}
      >
        {i18n('DeliveryIssue--learnMore')}
      </Button>
      <Button
        onClick={onClose}
        ref={focusRef}
        size={ButtonSize.Medium}
        variant={ButtonVariant.Primary}
        className="module-delivery-issue-dialog__close-button"
      >
        {i18n('Confirmation--confirm')}
      </Button>
    </>
  );

  const intlComponents = {
    sender: <Emojify text={sender.title} />,
  };

  return (
    <Modal
      modalName="DeliveryIssueDialog"
      hasXButton={false}
      onClose={onClose}
      i18n={i18n}
      modalFooter={footer}
    >
      <section>
        <div className="module-delivery-issue-dialog__image">
          <img
            src="images/delivery-issue.svg"
            height="110"
            width="200"
            alt=""
          />
        </div>
        <div className="module-delivery-issue-dialog__title">
          {i18n('DeliveryIssue--title')}
        </div>
        <div className="module-delivery-issue-dialog__description">
          {inGroup ? (
            <Intl
              id="DeliveryIssue--summary--group"
              components={intlComponents}
              i18n={i18n}
            />
          ) : (
            <Intl
              id="DeliveryIssue--summary"
              components={intlComponents}
              i18n={i18n}
            />
          )}
        </div>
      </section>
    </Modal>
  );
}
