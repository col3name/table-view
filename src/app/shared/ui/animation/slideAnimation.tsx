import React, { forwardRef, useMemo } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

type SlideAnimationDirection = 'left' | 'up' | 'right' | 'down';
export interface SlideAnimationProps {
  id: string;
  direction: SlideAnimationDirection;
  children?: React.ReactNode;
  delay?: number;
  enterDuration?: number;
  exitDirection?: 'same' | 'opposite';
  exitDuration?: number;
  component?: keyof React.ReactHTML;
  value?: number;
  inPercents?: boolean;
  withFading?: boolean;
}

interface RefSlideAnimationProps extends SlideAnimationProps {
  innerRef: React.ForwardedRef<HTMLElement>;
}

const getAnimationProps = (
    direction: SlideAnimationDirection,
    opacity: number,
    value: number,
    inPercents: boolean,
) => {
    const prop = ['left', 'right'].includes(direction) ? 'x' : 'y';
    const multiplier = ['right', 'down'].includes(direction) ? -1 : 1;
    const resultValue = value * multiplier;

    return { [prop]: inPercents ? `${resultValue}%` : resultValue, opacity };
};

const SlideAnimationComponent = <Tag extends keyof React.ReactHTML>({
    id,
    direction = 'up',
    children,
    delay = 0,
    enterDuration = 0.15,
    exitDirection = 'same',
    exitDuration = 0.1,
    component,
    value = 100,
    inPercents = true,
    withFading = false,
    ...restProps
}: RefSlideAnimationProps & {
  component?: Tag;
} & HTMLMotionProps<Tag>) => {
    const initial = useMemo(
        () => ({
            ...getAnimationProps(direction, withFading ? 0 : 1, value, inPercents),
            transition: {
                ease: 'easeOut',
                duration: enterDuration,
            },
        }),
        [direction, enterDuration, withFading, value, inPercents],
    );
    const enter = useMemo(
        () => ({
            ...getAnimationProps(direction, 1, 0, false),
            transition: {
                ease: 'easeOut',
                delay,
                duration: enterDuration,
            },
        }),
        [direction, delay, enterDuration],
    );
    const exit = useMemo(
        () => ({
            ...getAnimationProps(
                direction,
                withFading ? 0 : 1,
                -1 * value * (exitDirection === 'same' ? 1 : -1),
                inPercents,
            ),
            transition: {
                ease: 'easeIn',
                duration: exitDuration,
            },
        }),
        [direction, exitDirection, exitDuration, withFading, value, inPercents],
    );
    const Component = useMemo(() => motion.create(component || 'div'), [component]);
    const variants = {
        initial,
        enter,
        exit,
    };

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

type CastedSlideAnimationForwardFn = <Tag extends keyof React.ReactHTML>(
  props: SlideAnimationProps & { component?: Tag } & HTMLMotionProps<Tag>,
  ref: RefSlideAnimationProps['innerRef']
) => React.ReactElement | null;

const SlideAnimationForwardFn: CastedSlideAnimationForwardFn = (props, ref) => (
    <SlideAnimationComponent {...props} innerRef={ref} />
);

export const SlideAnimation = forwardRef(SlideAnimationForwardFn);
