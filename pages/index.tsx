import "twin.macro";
import { useEffect, useState } from "react";
import {
    AspectRatio,
    Button,
    Container,
    Grid,
    Heading,
    HStack,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import {
    ArrowDownLeft,
    ArrowElbowDownLeft,
    ArrowElbowLeftDown,
    MagnifyingGlass,
} from "phosphor-react";
import { useViewportScroll, motion, Variants } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

type LinkProps = {
    url: string;
    text: string;
};

const navLinks: LinkProps[] = [
    { url: "/", text: "Home" },
    { url: "projects/embeded", text: "Embeded." },
    { url: "propjects/web-frontend", text: "Web design & Frontend." },
    { url: "blog.", text: "Blog." },
    { url: "download/resume", text: "Download Resume." },
];

/* -------------------------------------------------------------------------- */
/*                                   NavLink                                  */
/* -------------------------------------------------------------------------- */

function NavLink({ url, text }: LinkProps) {
    return (
        <Link key={text} href={url} passHref>
            <a tw="px-4 py-4">{text}</a>
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */
type NavbarState = "normal" | "hide" | "show";
function Navbar({ initial = "normal", animate }: { initial?: NavbarState; animate: NavbarState }) {
    const variants: Variants = {
        normal: {
            y: 0,
        },
        hide: {
            y: "-100%",

            transitionEnd: {
                position: "fixed",
            },
        },
        show: {
            y: 0,
            transitionEnd: {
                position: "fixed",
            },
        },
    };

    return (
        <motion.nav
            tw="grid w-full grid-flow-col items-center px-8 gap-8 top-0 bg-white z-10"
            style={{ gridTemplateColumns: `1fr repeat(${navLinks.length}, max-content) 1fr` }}
            initial={initial}
            animate={animate}
            variants={variants}>
            <div />
            {navLinks.map((link) => (
                <NavLink key={link.text} {...link} />
            ))}
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

function ContactInput({ onClick }: { onClick?: () => void }) {
    return (
        <Grid w="full" gap={4} templateColumns="min-content 1fr" alignItems="center">
            <Text>Let‘s get in touch?</Text>
            <Input gridColumn="1/-1" placeholder="You email" />
            <Button variant="solid" onClick={onClick}>
                Send you email
            </Button>
            <HStack display="inline-flex">
                <span>or just press</span>
                <span tw="font-bold">
                    Enter <ArrowElbowDownLeft tw="inline" weight="bold" />
                </span>
            </HStack>
        </Grid>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */

export default function Home() {
    const { scrollY } = useViewportScroll();
    const [navbarState, setNavbarState] = useState<NavbarState>("normal");
    useEffect(() =>
        scrollY.onChange((y) => setNavbarState(y < window.innerHeight ? "hide" : "show"))
    );
    return (
        <div>
            <Navbar animate={"normal"} />
            <Navbar initial={"hide"} animate={navbarState} />
            <main tw="flex justify-center minHeight[calc(100vh - 200px)]">
                <Grid width="1024px" p={4} gap={8} templateColumns={[null, "1fr 1fr"]}>
                    <VStack justify="center" alignItems="start" spacing={8}>
                        <Heading>Hi, I‘m Kawin</Heading>
                        <Text color="secondary">
                            I am interested in all domains of computer science from embeded
                            programming to web design and frontend developement to machine learning
                            and algorithms.
                        </Text>
                        <ContactInput
                            onClick={() => setNavbarState((s) => (s === "show" ? "hide" : "show"))}
                        />
                    </VStack>
                    <VStack justify="center" gridRow={[1, null]} gridColumn={[1, 2]}>
                        <AspectRatio w="full" ratio={1}>
                            <div tw="bg-blueGray-200 rounded-lg"></div>
                        </AspectRatio>
                    </VStack>
                </Grid>
            </main>
            <div tw="w-full h-screen bg-blueGray-900"></div>
            <div tw="w-full h-screen bg-blueGray-900"></div>
        </div>
    );
}
