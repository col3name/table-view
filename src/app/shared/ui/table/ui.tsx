import styled, {css, keyframes} from "styled-components";


export const TableNavigationContainer = styled.nav`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;


export const FetchNextPageLoader = () => {
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

export const animateFade = () => {
    const anim = keyframes`
        0% {
            opacity: 1;
            visibility: visible;
        }
        100% {
            opacity: 0;
            visibility: collapse;
            height: 0;
        }
    `
    return css`${anim} 1s linear forwards 1`
};

export const TableBodyContainer = styled.ul`
    position: relative;
`;

export const Table = styled.div`
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

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: min(90vw, 1300px);
    max-height: min(90vh, 900px);
    overflow: auto;
`;

export const Cell = styled.span<{ $disabled?: boolean, $percent?: number; $last?: boolean; }>`
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

export const HeaderCell = styled(Cell)`
    font-family: Roboto, Arial, serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    text-align: left;
    color: #697180;
`;

export const Row = styled.li<{ $disabled?: boolean, $fade?: boolean, }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    height: 52px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    transition: all 0.2s ease-in-out;
    animation: ${props => props.$fade ? animateFade() : 'none'};

    &:hover {
        background-color: ${props => props.$disabled ? '#fff' : '#F0F3F7'};
        cursor: ${props => props.$disabled ? 'initial' : 'pointer'};
    }

    &:hover .action__delete-btn {
        opacity: 1;
    }
`;

export const HeaderRow = styled(Row)`
    font-weight: bold;
    background-color: #F0F3F7;
    position: sticky;
    padding: 10px;
    height: 32px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    &:hover {
        background-color: #F0F3F7;
        cursor: initial;
    }
`;


export const TableBottomActions = styled.div`
    display: flex;
    justify-content: flex-end;
    max-width: min(90vw, 1300px);
`;