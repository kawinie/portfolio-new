import tw, { theme, css } from "twin.macro";
import Link from "next/link";
import { Button, HStack, HTMLChakraProps, chakra } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;
export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

type LinkProps = {
    href: string;
    text: string;
    external?: boolean;
    download?: boolean;
};

const navLinks: LinkProps[] = [
    { href: "blog", text: "blog." },
    { href: "#projects", text: "projects." },
    { href: "download/resume.pdf", text: "download resumè.", external: true, download: true },
];

/* -------------------------------------------------------------------------- */
/*                                   NavLink                                  */
/* -------------------------------------------------------------------------- */

function NavButton({ href, text }: { href: string; text: string }) {
    return (
        <Button
            as="a"
            px={4}
            py={4}
            style={{ color: "inherit" }}
            variant="ghost"
            fontWeight="normal"
            onClick={() => {
                const e = document.getElementById(href);
                if (e) e.scrollIntoView({ behavior: "smooth" });
            }}>
            {text}
        </Button>
    );
}

export function NavLink({ href, text, external, download }: LinkProps) {
    return external ? (
        <a href={href} download={download}>
            <NavButton href={href} text={text}></NavButton>
        </a>
    ) : (
        <Link href={href} passHref>
            <NavButton href={href} text={text}></NavButton>
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */
type NavBarState = "hide" | "show";
export type NavBarProps = {
    animate?: NavBarState;
    variant?: "normal" | "ghost";
};

export function NavBar({ animate, variant = "normal" }: NavBarProps) {
    const variants: Variants = {
        hide: {
            y: "-100%",
            opacity: 0,
            transitionEnd: { position: "fixed" },
        },
        show: {
            y: 0,
            opacity: 1,
            transitionEnd: { position: "fixed" },
        },
    };

    const styles = css`
        grid-template-columns: max-content 1fr max-content;
        ${variant == "normal" && tw`bg-blueGray-200 text-black`}
        ${variant == "ghost" && tw`bg-black text-white`}
    `;

    return (
        <motion.nav
            tw="grid w-full grid-flow-col items-center px-8 gap-8 top-0 z-10"
            css={styles}
            initial={false}
            animate={animate}
            variants={variants}
            transition={{ type: "tween" }}>
            <NavLink href="/" text="Kawin Pechetratanapanit" />
            <HStack justify="center">
                {navLinks.map((link) => (
                    <NavLink key={link.text} {...link} />
                ))}
            </HStack>

            <Button
                fontWeight="normal"
                justifySelf="end"
                variant="ghost"
                leftIcon={<MagnifyingGlass size={24} />}>
                Search
            </Button>
        </motion.nav>
    );
}
