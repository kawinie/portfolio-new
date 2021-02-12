import { theme } from "twin.macro";
import { useEffect, useState } from "react";
import {
    AspectRatio,
    Button,
    Grid,
    Heading,
    HStack,
    Input,
    TagLabel,
    Text,
    VStack,
    Tag,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { ArrowRight, MagnifyingGlass, PaperPlane } from "phosphor-react";
import { useViewportScroll, motion, Variants } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

type LinkProps = {
    url: string;
    text: string;
};

const navLinks: LinkProps[] = [
    { url: "/", text: "Home." },
    { url: "projects/embeded", text: "Embeded." },
    { url: "propjects/web-frontend", text: "Web design & Frontend." },
    { url: "blog.", text: "Blog." },
    { url: "download/resume", text: "Download Resumè." },
];

const articles: ProjectSectionProps["articles"] = [
    {
        image: "assets/ednaUI-monitor.png",
        title: "ednaUI",
        short:
            " ednaUI is a companion browser-based application custom designed from the ground up for controlling ednaServer. It provides interface for real-time status monitoring and task scheduling.",
        tags: ["TypeScript", "React", "TailwindCSS", "Webpack (Preact optimized)"],
    },
];

/* -------------------------------------------------------------------------- */
/*                                   NavLink                                  */
/* -------------------------------------------------------------------------- */

function NavLink({ url, text }: LinkProps) {
    return (
        <Link key={text} href={url} passHref>
            <a tw="px-4 py-4 lowercase" style={{ color: "inherit" }}>
                {text}
            </a>
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Navbar                                   */
/* -------------------------------------------------------------------------- */
type NavbarState = "normal" | "hide" | "show";
type NavbarProps = {
    initial?: NavbarState;
    animate: NavbarState;
    variant?: "normal" | "ghost";
};

function Navbar({ initial = "normal", animate, variant = "normal" }: NavbarProps) {
    const variants: Variants = {
        normal: { y: 0 },
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

    return (
        <motion.nav
            tw="grid w-full grid-flow-col items-center px-8 gap-8 top-0 z-10"
            style={{
                gridTemplateColumns: `1fr repeat(${navLinks.length}, max-content) 1fr`,
                background: variant === "normal" ? theme`colors.white` : theme`colors.black`,
                color: variant === "normal" ? theme`colors.black` : theme`colors.white`,
            }}
            initial={initial}
            animate={animate}
            variants={variants}
            transition={{ type: "tween" }}>
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
        <Grid w="full" gap={6} alignItems="center">
            <div tw="-mb-2 text-secondary">Your email</div>
            <Input gridColumn="1/-1" placeholder="" />
            <div tw="-mb-2 text-secondary">Leave a message</div>
            <Input gridColumn="1/-1" placeholder="Hi! Let's chat about tech sometimes" />
            <Button
                variant="solid"
                onClick={onClick}
                justifySelf="start"
                rightIcon={<PaperPlane size={20} />}>
                Submit
            </Button>
        </Grid>
    );
}

function ProjectNav() {
    return (
        <nav tw="relative">
            <div tw="fixed top-48 grid gap-4">
                <Heading as="h2" size="lg" color="coolGray.200">
                    Projects
                </Heading>
                <ul tw="grid gap-4 flex flex-col items-end">
                    {["ednaServer", "ednaUI"].map((t) => (
                        <li key={t} tw="text-blueGray-200 hover:(text-cyan-200 cursor-pointer)">
                            {t}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

type ProjectSectionProps = {
    state: "hide" | "show";
    articles: {
        image: string;
        title: string;
        short: string;
        tags: string[];
    }[];
};

function ProjectSection({ articles, state }: ProjectSectionProps) {
    const variants: Variants = {
        hide: { opacity: 0 },
        show: { opacity: 1 },
    };

    return (
        <section tw="w-full min-h-screen bg-black flex justify-center padding[200px 0]">
            <motion.div
                tw="grid flex-grow max-w-screen-lg px-8 gridTemplateColumns[3fr 7fr] gap-32"
                variants={variants}
                initial={false}
                animate={state}>
                <ProjectNav />
                {articles.map(({ image, title, short, tags }) => (
                    <VStack
                        key={title}
                        as="article"
                        spacing={8}
                        color="coolGray.400"
                        alignItems="start"
                        id={title}>
                        <AspectRatio w="full" ratio={16 / 9} rounded="xl" overflow="hidden">
                            <img src={image} alt="" />
                        </AspectRatio>
                        <Heading as="h3" color="coolGray.200">
                            {title}
                        </Heading>
                        <Text>{short}</Text>
                        <HStack wrap="wrap">
                            {tags.map((t) => (
                                <Tag key={t} variant="subtle" colorScheme="whiteAlpha">
                                    {t}
                                </Tag>
                            ))}
                        </HStack>
                        <HStack w="full" justify="end" color="black">
                            <Button rightIcon={<ArrowRight />}>Learn More</Button>
                        </HStack>
                    </VStack>
                ))}
            </motion.div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */

export default function Home() {
    const [state, setState] = useState<"hide" | "show">("hide");
    const { scrollY } = useViewportScroll();

    // Detect scrollY position and set navbar state
    useEffect(
        () => scrollY.onChange((y) => setState(y < window.innerHeight - 200 ? "hide" : "show")),
        [] //eslint-disable-line
    );

    return (
        <div tw="w-screen overflow-x-hidden">
            <Navbar animate={"normal"} />
            <Navbar initial={"hide"} animate={state} variant="ghost" />
            <main tw="flex justify-center minHeight[calc(100vh - 200px)]">
                <Grid maxWidth="container.lg" p={4} gap={8} templateColumns={[null, "1fr 1fr"]}>
                    <VStack justify="center" alignItems="start" spacing={8}>
                        <Heading>Hi, I‘m Kawin</Heading>
                        <Text color="secondary">
                            I am interested in all domains of computer science from embeded
                            programming to web design and frontend developement to machine learning
                            and algorithms.
                        </Text>
                        <ContactInput
                            onClick={() => setState((s) => (s === "show" ? "hide" : "show"))}
                        />
                    </VStack>
                    <VStack justify="center" gridRow={[1, null]} gridColumn={[1, 2]}>
                        <AspectRatio w="full" ratio={1}>
                            <div tw="bg-blueGray-200 rounded-lg"></div>
                        </AspectRatio>
                    </VStack>
                </Grid>
            </main>
            <ProjectSection state={state} articles={articles} />
        </div>
    );
}
