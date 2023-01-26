/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  /* BorrowLimitUsedAccountHealth, */
  Icon,
  Toggle,
  ToggleProps,
  Tooltip,
} from 'components';
import React from 'react';
import { useTranslation } from 'translation';
import { formatCentsToReadableValue, formatToReadablePercentage } from 'utilities';

import { useMyAccountStyles as useStyles } from './styles';

export interface MyAccountUiProps {
  netApyPercentage: number | undefined;
  dailyEarningsCents: number | undefined;
  supplyBalanceCents: number | undefined;
  borrowBalanceCents: number | undefined;
  borrowLimitCents: number | undefined;
  safeBorrowLimitPercentage: number;
  isXcnEnabled: boolean;
  onXcnToggle: (newValue: boolean) => void;
  className?: string;
}

export const MyAccountUi = ({
  netApyPercentage,
  dailyEarningsCents,
  supplyBalanceCents,
  borrowBalanceCents,
  // borrowLimitCents,
  // safeBorrowLimitPercentage,
  isXcnEnabled,
  onXcnToggle,
  className,
}: MyAccountUiProps) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const handleXcnToggleChange: ToggleProps['onChange'] = (_event, checked) => onXcnToggle(checked);

  // const safeBorrowLimitCents =
  //   typeof borrowLimitCents === 'number'
  //     ? Math.floor((borrowLimitCents * safeBorrowLimitPercentage) / 100)
  //     : undefined;

  // const readableSafeBorrowLimit = formatCentsToReadableValue({
  //   value: safeBorrowLimitCents,
  // });

  const readableNetApyPercentage = formatToReadablePercentage(netApyPercentage);

  const readableBorrowBalance = formatCentsToReadableValue({
    value: borrowBalanceCents,
  });

  const readableDailyEarnings = formatCentsToReadableValue({
    value: dailyEarningsCents,
  });

  const readableSupplyBalance = formatCentsToReadableValue({
    value: supplyBalanceCents,
  });

  return (
    <Paper css={styles.container} className={className}>
      <div css={[styles.row, styles.header]}>
        <Typography variant="h4">{t('myAccount.title')}</Typography>

        <div css={styles.apyWithXcn}>
          <Tooltip css={styles.tooltip} title={t('myAccount.apyWithXcnTooltip')}>
            <Icon css={styles.infoIcon} name="info" />
          </Tooltip>

          <Typography
            color="text.primary"
            variant="small1"
            component="span"
            css={styles.apyWithXcnLabel}
          >
            {t('myAccount.apyWithXcn')}
          </Typography>

          <Toggle css={styles.toggle} value={isXcnEnabled} onChange={handleXcnToggleChange} />
        </div>
      </div>

      <div css={styles.netApyContainer}>
        <div css={styles.netApy}>
          <Typography component="span" variant="small2" css={styles.netApyLabel}>
            {t('myAccount.netApy')}
          </Typography>

          <Tooltip css={styles.tooltip} title={t('myAccount.netApyTooltip')}>
            <Icon css={styles.infoIcon} name="info" />
          </Tooltip>
        </div>

        <Typography
          variant="h1"
          color={
            netApyPercentage !== undefined && netApyPercentage >= 0
              ? 'interactive.success'
              : 'interactive.error'
          }
          component="span"
        >
          {readableNetApyPercentage}
        </Typography>
      </div>

      <ul css={styles.list}>
        <Typography component="li" variant="h4" css={styles.item}>
          <Typography component="span" variant="small2" css={styles.labelListItem}>
            {t('myAccount.dailyEarnings')}
          </Typography>

          {readableDailyEarnings}
        </Typography>

        <div className="divider" />

        <Typography component="li" variant="h4" css={styles.item}>
          <Typography component="span" variant="small2" css={styles.labelListItem}>
            {t('myAccount.supplyBalance')}
          </Typography>

          {readableSupplyBalance}
        </Typography>

        <div className="divider" />

        <Typography component="li" variant="h4" css={styles.item}>
          <Typography component="span" variant="small2" css={styles.labelListItem}>
            {t('myAccount.borrowBalance')}
          </Typography>

          {readableBorrowBalance}
        </Typography>
      </ul>

      {/* <BorrowLimitUsedAccountHealth
        css={styles.progressBar}
        borrowBalanceCents={borrowBalanceCents}
        safeBorrowLimitPercentage={safeBorrowLimitPercentage}
        borrowLimitCents={borrowLimitCents}
      />

      <div css={styles.bottom}>
        <Icon name="shield" css={styles.shieldIcon} />

        <Typography component="span" variant="small2" css={styles.inlineLabel}>
          {t('myAccount.safeLimit')}
        </Typography>

        <Typography component="span" variant="small1" color="text.primary" css={styles.safeLimit}>
          {readableSafeBorrowLimit}
        </Typography>

        <Tooltip
          css={styles.tooltip}
          title={t('myAccount.safeLimitTooltip', { safeBorrowLimitPercentage })}
        >
          <Icon css={styles.infoIcon} name="info" />
        </Tooltip>
      </div> */}
    </Paper>
  );
};

export default MyAccountUi;
