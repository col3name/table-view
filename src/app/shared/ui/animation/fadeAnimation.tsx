import React, { forwardRef, useMemo } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

export interface FadeAnimationProps {
    id: string;
    children?: React.ReactNode;
    delay?: number;
    enterDuration?: number;
    exitDuration?: number;
    component?: keyof React.ReactHTML;
}

interface RefFadeAnimationProps extends FadeAnimationProps {
    innerRef: React.ForwardedRef<HTMLElement>;
}

const FadeAnimationComponent = <Tag extends keyof React.ReactHTML = 'div'>({
                                                                               id,
                                                                               children,
                                                                               delay = 0,
                                                                               enterDuration = 0.15,
                                                                               exitDuration = 0.1,
                                                                               component,
                                                                               ...restProps
                                                                           }: RefFadeAnimationProps & {
    component?: Tag;
} & HTMLMotionProps<Tag>) => {
    const initial = useMemo(
        () => ({
            opacity: 0,
            transition: {
                ease: 'easeOut',
                duration: enterDuration,
            },
        }),
        [enterDuration],
    );
    const enter = useMemo(
        () => ({
            opacity: 1,
            transition: {
                ease: 'easeOut',
                delay,
                duration: enterDuration,
            },
        }),
        [delay, enterDuration],
    );
    const exit = useMemo(
        () => ({
            opacity: 0,
            transition: {
                ease: 'easeIn',
                duration: exitDuration,
            },
        }),
        [exitDuration],
    );
    const variants = {
        initial,
        enter,
        exit,
    };
    const Component = useMemo(() => motion.create(component || 'div'), [component]);

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Component
            key={id}
            {...restProps}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
        >
            {children}
        </Component>
    );
};

type CastedFadeAnimationForwardFn = <Tag extends keyof React.ReactHTML>(
    props: FadeAnimationProps & { component?: Tag } & HTMLMotionProps<Tag>,
    ref: RefFadeAnimationProps['innerRef']
) => React.ReactElement | null;

const FadeAnimationForwardFn: CastedFadeAnimationForwardFn = (props, ref) => (
    <FadeAnimationComponent {...props} innerRef={ref} />
);

export const FadeAnimation = forwardRef(FadeAnimationForwardFn);
