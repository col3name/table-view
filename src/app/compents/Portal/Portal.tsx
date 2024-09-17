import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PortalPropsType = {
    children: React.ReactNode;
};

const Portal: React.FC<PortalPropsType> = ({ children }) => {
    const [element, setElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.getElementById("root-modal");
        setElement(element);
    }, []);

    if (!element) {
        return null;
    }
    return createPortal(children, element);
};

export default Portal;