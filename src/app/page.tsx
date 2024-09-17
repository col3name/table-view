
import {useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import styled from "styled-components";

import {useStore} from "./stores";
import {H2} from "./shared/components/typography";
import {PopupRemoveMeter} from "./components/meter/removePopup";
import {MeterTable} from "./components/meter/table";

const Container = styled.div<{ $hidden?: boolean }>`
    display: ${props => props.$hidden ? 'none' : 'flex'};
    flex-direction: column;

    gap: 4px;
    margin: 0 auto;
    max-width: 1400px;
`;


export const HomePage = observer(() => {
    const store = useStore();

    useLayoutEffect(() => {
        store.meterStore.fetchMeters();
    }, [store.meterStore]);


    return (
        <Container>
            <H2>Список счётчиков</H2>
            <MeterTable/>
            <PopupRemoveMeter/>
        </Container>
    );
});

