import React, {MouseEvent, useCallback} from "react";

import {Button} from "../button";

type NavButtonProps = {
    page: number;
    active: boolean;
    setPage: (page: number) => void;
};

export const NavButton: React.FC<NavButtonProps> = React.memo(function NavButton({
                                                                   page,
                                                                   active,
                                                                   setPage,
                                                               }: NavButtonProps) {
    const onClick = useCallback( (page: number) => async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setPage(page);
    }, [setPage]);

    if (Number.isNaN(page)) {
        return <Button type="button" disabled>...</Button>
    }

    return (
        <Button
            $active={active}
            type="button"
            onClick={onClick(page)}
        >
            {page}
        </Button>
    );
});
