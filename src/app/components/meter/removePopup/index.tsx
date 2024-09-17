import {observer} from "mobx-react";

import {Modal, ModalRow} from "../../modal/modal";

import styled from "styled-components";

import {useStore} from "../../../stores";
import {useConfirmPopup} from "./useConfirmPopup.hook";
import {useHandleModalKeyboard} from "../../modal/useHandleModalKeyboard";

export const PopupRemoveMeter = observer(() => {
    const {opened, close, confirm} = useConfirmPopup();

    const meterStore = useStore().meterStore;
    const isLoading = meterStore.deleteLoading;

    useHandleModalKeyboard({opened, onConfirm: confirm, onCancel: close});

    return (
        <Modal active={opened} close={close} title={"Удаление билета"}>
            <p>Вы уверены, что хотите удалить запись?</p>
            {isLoading ? <span>Loading</span>: <span>-</span>}
            <ModalRow>
                <Button $primary={true} onClick={confirm}>Да</Button>
                <Button onClick={close}>
                    Нет
                </Button>
            </ModalRow>
        </Modal>
    );
});

const Button = styled.button<{ $primary?: boolean }>`
    background-color: ${({$primary}) =>
            $primary ? 'hsla(40, 72%, 50%, 1)' : 'hsla(347, 49%, 46%, 1)'};
    border: 1px solid ${({$primary}) => ($primary ? 'hsla(40, 72%, 60%, 1)' : 'hsla(0, 0%, 0%, 0.4)')};
    white-space: nowrap;
    color: hsla(150, 14%, 97%, 1);
    cursor: pointer;
    outline: none;
    font-size: 15px;;
    line-height: 18px;
    text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
    letter-spacing: 0.1rem;
    border-radius: 0.5rem;
    user-select: none;
    padding: 4px 8px;
    margin: 0;
    transition: all 0.1s ease-in;

    ::-moz-focus-inner {
        border: 0;
    }

    &:hover {
        background-color: ${({$primary}) =>
                $primary ? 'hsla(40, 72%, 60%, 1)' : 'hsla(347, 49%, 51%, 1)'};
        ${({$primary}) => $primary && `transform: translateY(-3px)`}
    }

    &:active {
        background-color: ${({$primary}) =>
                $primary ? 'hsla(40, 72%, 35%, 1)' : 'hsla(347, 49%, 26%, 1)'};
    }
`