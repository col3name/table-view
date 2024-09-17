"use client";

import React, {memo, MouseEvent, useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import styled, {css, keyframes} from "styled-components";

import {useStore} from "./stores";
import {DeleteButton} from "./shared/components/Button";
import {XBCIcon} from "./shared/icons/XBCIcon.tsx";
import {GBCIcon} from "./shared/icons/GBCIcon.tsx";
import {DeleteIcon} from "./shared/icons/DeleteIcon.tsx";
import {formatDate} from "./shared/lib/date.ts";
import {H2} from "./shared/components/typography";
import {PopupRemoveMeter} from "./compents/Meter/removePopup";


const Container = styled.div<{ $hidden?: boolean }>`
    display: ${props => props.$hidden ? 'none' : 'flex'};
    flex-direction: column;

    gap: 4px;
    margin: 0 auto;
    max-width: 1400px;
`;

const Table = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #E0E5EB;
    border-radius: 12px;
    overflow-y: auto;
    overflow-x: auto;
    height: 90vh;
    min-width: 1300px;
    max-width: 1400px;
`;

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: min(90vw, 1300px);
    max-height: min(90vh, 900px);
    overflow: scroll;
`;


const Cell = styled.span<{ $disabled?: boolean, $percent?: number; $last?: boolean; }>`
    width: ${props => `${props.$percent}%`};
    color: ${props => !props.$disabled ? '#1F2939' : '#5E6674'};

    display: flex;
    flex-direction: row;
    justify-content: ${props => props.$last ? 'flex-end' : 'flex-start'};
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
`;

const HeaderCell = styled(Cell)`
    font-family: Roboto, Arial, serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    text-align: left;
    color: #697180;
`;

const Row = styled.li<{ $disabled?: boolean, $fade?: boolean, }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    height: 52px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.2s ease-in-out;
    animation: ${props => props.$fade ? animateFade() : 'none'};

    &:hover {
        background-color: ${props => props.$disabled ? '#fff' : '#F0F3F7'};
        cursor: ${props => props.$disabled ? 'initial' : 'pointer'};
    }

    &:hover .action__delete-btn {
        opacity: 1;
    }
`;

const HeaderRow = styled(Row)`
    font-weight: bold;
    background-color: #F0F3F7;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    &:hover {
        background-color: #F0F3F7;
        cursor: initial;
    }
`;
type MeterDeleteButtonProps = {
    className?: string;
    meterId: string;
    onDeleteStart: VoidFunction;
    onDeleteDone: VoidFunction;
};

const MeterDeleteButton: React.FC<MeterDeleteButtonProps> = observer(({
                                                                          className = '',
                                                                          meterId,
                                                                          onDeleteStart,
                                                                          onDeleteDone,
                                                                      }) => {
    const store = useStore();
    const isLoading: boolean = meterId === store.meterStore.deleteMeterId && store.meterStore.deleteLoading;

    useEffect(() => {
        // if (store.meterStore.confirmDeletePopup.opened) {
        // }
        if (isLoading) {
            onDeleteStart();
        }

    }, [isLoading, onDeleteStart, store.meterStore.confirmDeletePopup.opened]);


    const handleDelete = useCallback(() => {
        if (isLoading) {
            return;
        }
        store.meterStore.openRemoveConfirmPopup(meterId);

    }, [isLoading, meterId, store.meterStore]);

    useEffect(() => {
        if (isLoading) {
            onDeleteDone();
        }
    }, [isLoading, onDeleteDone]);

    return (
        <DeleteButton disabled={isLoading} className={className} onClick={handleDelete}>
            <DeleteIcon/>
        </DeleteButton>
    )
})

type MeterIcon = {
    type: string;
};

const MeterIcon: React.FC<MeterIcon> = ({
                                                   type
                                               }) => {
    return (
        <MeterIconContainer>
            {type === 'ColdWaterAreaMeter' && <><XBCIcon/><span>ХВС</span></>}
            {type === 'HotWaterAreaMeter' && <><GBCIcon/><span>ГВС</span></>}
        </MeterIconContainer>
    )
}

const MeterIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;

const animateFade = () => {
    const anim = keyframes`
        0% {
            opacity: 1;
            height: initial;
        }
        100% {
            opacity: 0;
            height: 0;
        }
    `
    return css`${anim} 1s linear forwards 1`
};

type MeterProps = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    meter;
    headerSizes: number[];
};
const MeterRow = observer(({headerSizes, meter}: MeterProps) => {
    const area = meter.area;
    const [isFadingOut, setIsFadingOut] = useState(false);

    const fadeOut = () => {
        setIsFadingOut(true);
    };
    const handleRemoveItem = () => {
        setIsFadingOut(false);
    };

    const installationDate = useMemo(() => {
        return formatDate(new Date(meter.installation_date));
    }, [meter.installation_date]);

    const types = useMemo(() => {
        return meter._type.map((type: string, index: number) => (
            <MeterIcon key={type + ':' + index} type={type}/>
        ));
    }, [meter._type]);

    return (
        <Row $fade={isFadingOut}>
            <Cell $percent={headerSizes[0]}>{meter.place}</Cell>
            <Cell $percent={headerSizes[1]}>{types}</Cell>
            <Cell $percent={headerSizes[2]}>{installationDate}</Cell>
            <Cell $percent={headerSizes[3]}>{meter.is_automatic ? 'да' : 'нет'}</Cell>
            <Cell $percent={headerSizes[4]}>{meter.initial_values}</Cell>
            <Cell $percent={headerSizes[5]}>
                {area?.house ? `${area.house.address} ${area.str_number_full}` : '-'}
            </Cell>
            <Cell $disabled={true} $percent={headerSizes[6]}>{meter.description || '—'}</Cell>
            <Cell $last={true} $percent={headerSizes[7]}>
                <MeterDeleteButton
                    onDeleteStart={fadeOut}
                    onDeleteDone={() => setTimeout(() => handleRemoveItem(), 300)}
                    className="action__delete-btn"
                    meterId={meter.id}
                />
            </Cell>
        </Row>
    );
});

const getPages = (count: number, current: number): number[] => {
    if (count > 10) {
        if (current < 4 || current >= count - 2) {
            return [1, 2, 3, 4, NaN, count - 3, count - 2, count - 1, count]
        }
        return [1, NaN, current - 1, current, current + 1, NaN, count - 1, count,]
    }
    return [];
};

function Button(props: { page: number, current: number }) {
    const page = props.page;
    const current = props.current;
    const store = useStore();
    if (Number.isNaN(page)) {
        return <NavigationButton type="button" disabled>...</NavigationButton>
    }
    const active = page === current;
    const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        await store.meterStore.setPage(page);
    };

    return (
        <NavigationButton
            $active={active}
            type="button"
            onClick={onClick}
        >
            {page}
        </NavigationButton>
    );
}

const TableNavigation = observer(() => {
    const store = useStore();

    const count = store.meterStore.countPage;
    const current = store.meterStore.currentPage;
    const pages = getPages(count, current);

    return (
        <NavigationContainer>
            {pages.map((page: number, index: number) => {
                return (
                    <Button key={page + ':' + index} current={current} page={page}/>
                )
            })}
        </NavigationContainer>
    );
});

const NavigationContainer = styled.nav`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

const NavigationButton = styled.button<{ $active?: boolean; }>`
    border: 1px solid #CED5DE;
    padding: 8px 12px 8px 12px;
    background-color: ${props => props.$active ? "#F2F5F8" : "white"};
    gap: 8px;
    border-radius: 6px;
    cursor: pointer;
`;

const FetchNextPageLoader = () => {
    return (
        <FetchPageLoader>
            <span>Loading</span>
        </FetchPageLoader>
    );
};


const FetchPageLoader = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
`;

const TableBody = styled.ul`
    position: relative;
`;
const headerSizes = [2, 4, 8, 8, 10, 30, 8, 8];

const TableHeader = memo(function TableHeader() {
    return (
        <HeaderRow>
            <HeaderCell $percent={headerSizes[0]}>№</HeaderCell>
            <HeaderCell $percent={headerSizes[1]}>Тип</HeaderCell>
            <HeaderCell $percent={headerSizes[2]}>Дата установки</HeaderCell>
            <HeaderCell $percent={headerSizes[3]}>Автоматический</HeaderCell>
            <HeaderCell $percent={headerSizes[4]}>Текущине показания</HeaderCell>
            <HeaderCell $percent={headerSizes[5]}>Адрес</HeaderCell>
            <HeaderCell $percent={headerSizes[6]}>Примечание</HeaderCell>
            <HeaderCell $percent={headerSizes[7]}></HeaderCell>
        </HeaderRow>
    );
});

export const HomePage = observer(() => {
    const store = useStore();

    useLayoutEffect(() => {
        store.meterStore.fetchMeters();
    }, [store.meterStore]);

    const meters = store.meterStore.meterList;
    const loading = store.meterStore.meterLoading;
    const isFetchingNextPage = store.meterStore.isFetchingNextPage;

    return (
        <Container>
            <H2>Список счётчиков</H2>
            <TableContainer>
                <Table>
                    <TableHeader/>

                    <TableBody>
                        {isFetchingNextPage && <FetchNextPageLoader/>}
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            meters.map(meter => {
                                return (
                                    <MeterRow key={meter.id} headerSizes={headerSizes} meter={meter}/>
                                );
                            })
                        )}

                    </TableBody>
                </Table>

            </TableContainer>
            <TableBottomActions>
                <TableNavigation/>
            </TableBottomActions>
            <PopupRemoveMeter/>
        </Container>
    );
});

const TableBottomActions = styled.div`
    display: flex;
    justify-content: flex-end;
    max-width: min(90vw, 1300px);
`;
