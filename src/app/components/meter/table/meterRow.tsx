import React, { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { Cell, Row } from '../../../shared/ui/table/ui';
import { MeterDeleteButton } from './meterDeleteButton';

import { formatDate } from '../../../shared/lib/date';
import { HvsIcon } from '../../../shared/icons/Hvs.tsx';
import { GvsIcon } from '../../../shared/icons/Gvs.tsx';

type MeterIcon = {
  type: string;
};

const MeterIcon: React.FC<MeterIcon> = ({ type }) => {
  return (
    <MeterIconContainer>
      {type === 'ColdWaterAreaMeter' && (
        <>
          <HvsIcon />
          <span>ХВС</span>
        </>
      )}
      {type === 'HotWaterAreaMeter' && (
        <>
          <GvsIcon />
          <span>ГВС</span>
        </>
      )}
    </MeterIconContainer>
  );
};

const MeterIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

type MeterRowProps = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  meter;
  place?: number;
  headerSizes: number[];
  children: React.ReactNode;
};

const useFadeAnimation = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const fadeOn = useCallback(() => {
    setIsFadingOut(true);
  }, []);

  const fadeOut = useCallback(() => {
    setIsFadingOut(false);
  }, []);

  const onFadeOut = useCallback(() => setTimeout(fadeOut, 400), [fadeOut]);

  return {
    isFadingOut,
    fadeOn,
    fadeOut: onFadeOut,
  };
};

export const MeterRow = observer(
  ({ headerSizes, meter, children }: MeterRowProps) => {
    const area = meter.area;

    const { isFadingOut, fadeOn, fadeOut } = useFadeAnimation();

    const installationDate = useMemo(() => {
      return formatDate(new Date(meter.installation_date));
    }, [meter.installation_date]);

    const types = useMemo(() => {
      return meter._type.map((type: string, index: number) => (
        <MeterIcon key={type + ':' + index} type={type} />
      ));
    }, [meter._type]);

    return (
      <Row $fade={isFadingOut}>
        {children}
        <Cell $percent={headerSizes[1]}>{types}</Cell>
        <Cell $percent={headerSizes[2]}>{installationDate}</Cell>
        <Cell $percent={headerSizes[3]}>
          {meter.is_automatic ? 'да' : 'нет'}
        </Cell>
        <Cell $percent={headerSizes[4]}>{meter.initial_values}</Cell>
        <Cell $percent={headerSizes[5]}>
          {area?.house ? `${area.house.address} ${area.str_number_full}` : '-'}
        </Cell>
        <Cell $disabled={true} $percent={headerSizes[6]}>
          {meter.description || '—'}
        </Cell>
        <Cell $last={true} $percent={headerSizes[7]}>
          <MeterDeleteButton
            onDeleteStart={fadeOn}
            onDeleteDone={fadeOut}
            className="action__delete-btn"
            meterId={meter.id}
          />
        </Cell>
      </Row>
    );
  }
);
