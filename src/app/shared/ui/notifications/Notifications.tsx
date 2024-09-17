import React from 'react';
import { Children, isValidElement } from 'react';
import cn from 'classnames';
// import {AnimatePresence} from "framer-motion";

import styles from './Notifications.module.scss';

import {INotificationProps} from "../../typings/notifications";

// import {SlideAnimation} from "../animation/slideAnimation";

export interface NotificationsProps
    extends React.HTMLAttributes<HTMLUListElement> {
    children: React.ReactElement<INotificationProps & { id: string }>[];
}

export const Notifications: React.FC<NotificationsProps> =
    ({
        className,
        children,
        ...restProps
    }) => (
        <ul className={ cn(styles.notifications, className) } { ...restProps }>
            {/*<AnimatePresence>*/}
            {/*    { Children.map(children, child => {*/}
            {/*        if (!isValidElement(child)) {*/}
            {/*            return null;*/}
            {/*        }*/}

            {/*        return (*/}
            {/*            <SlideAnimation*/}
            {/*                key={ child.props.id }*/}
            {/*                component="li"*/}
            {/*                id={ child.props.id }*/}
            {/*                layout*/}
            {/*                className={ styles.item }*/}
            {/*                direction="down"*/}
            {/*                value={ 50 }*/}
            {/*                inPercents={ false }*/}
            {/*                exitDirection="opposite"*/}
            {/*                withFading*/}
            {/*            >*/}
            {/*                { child }*/}
            {/*            </SlideAnimation>*/}
            {/*        );*/}
            {/*    }) }*/}
            {/*</AnimatePresence>*/}
            { Children.map(children, child => {
                if (!isValidElement(child)) {
                    return null;
                }

                return child;
            }) }
        </ul>
    );
