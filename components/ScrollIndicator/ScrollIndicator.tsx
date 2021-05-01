import tw from "twin.macro";
import { useEffect, useState } from "react";
import { useViewportScroll, motion, useSpring, transform } from "framer-motion";

export function ScrollIndicator() {
    const [hideCircle, setHideCircle] = useState(false);
    const [hideTick, setHideTick] = useState(false);

    // Animate pathLength property of svg path
    const { scrollY } = useViewportScroll();
    const pathLength = useSpring(0, { stiffness: 50 });

    // Subscribe to scroll onChange
    useEffect(
        () => {
            return scrollY.onChange((x) => {
                pathLength.set(transform(x, [0, window.innerHeight - 200], [0, 1]));
            });
        },
        [] //eslint-disable-line
    );

    useEffect(
        () =>
            pathLength.onChange((x) => {
                setHideCircle(x === 1 || x < 0.05);
                setHideTick(x === 1);
            }),
        [] //eslint-disable-line
    );

    return (
        <div tw="h-full w-full flex justify-center items-center relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 256 256"
                css={[tw`absolute`, hideCircle && !hideTick && tw`animate-bounce`]}>
                <motion.path
                    d="M208 96 L128 176 L48 96"
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    initial={false}
                    animate={{ opacity: hideTick ? 0 : 1 }}
                />
            </svg>
            <svg tw="w-16 h-16 flex" viewBox="0 0 50 50">
                <motion.path
                    fill="none"
                    strokeLinecap="round"
                    strokeWidth="5"
                    stroke="white"
                    d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                    animate={{ opacity: hideCircle ? 0 : 1 }}
                    initial={false}
                    style={{
                        pathLength,
                        rotate: 90,
                        translateX: 5,
                        translateY: 5,
                        scaleX: -1, // Reverse direction of line animation
                    }}
                />
            </svg>
            <motion.div
                tw="absolute top-3/4 w-screen h-1 bg-white"
                style={{ scaleX: pathLength }}
                animate={{ opacity: hideCircle ? 0 : 1 }}
            />
        </div>
    );
}
