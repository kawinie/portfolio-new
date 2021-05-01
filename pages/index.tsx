import "twin.macro";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    AspectRatio,
    Grid,
    Heading,
    Text,
    VStack,
    Button,
    chakra,
    HTMLChakraProps,
    HStack,
} from "@chakra-ui/react";
import { useViewportScroll, motion, Variants, HTMLMotionProps } from "framer-motion";
import { GetStaticPropsResult } from "next";
import { RocketLaunch } from "phosphor-react";

import { Project, ProjectProps } from "components/Project";
import { ScrollIndicator } from "components/ScrollIndicator";
import { NavBar } from "components/NavBar";
import { ContactForm } from "components/ContactForm";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;
export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

/* -------------------------------------------------------------------------- */
/*                             Project Navigation                             */
/* -------------------------------------------------------------------------- */

function ProjectNav({ projects }: { projects: string[] }) {
    return (
        <nav tw="sticky top-1/3">
            <VStack alignItems="end" spacing={4}>
                <Heading as="h2" size="lg" color="coolGray.200">
                    Projects
                </Heading>
                <ul tw="grid gap-4 flex flex-col items-end">
                    {projects.map((t) => (
                        <li key={t} tw="text-blueGray-200 hover:(text-cyan-200 cursor-pointer)">
                            {t}
                        </li>
                    ))}
                </ul>
            </VStack>
        </nav>
    );
}

/* -------------------------------------------------------------------------- */
/*                               Project Section                              */
/* -------------------------------------------------------------------------- */

export type ProjectSectionProps = {
    state: "hide" | "show";
    projects: ProjectProps[];
};

export function ProjectSection({ projects, state }: ProjectSectionProps) {
    const variants: Variants = {
        hide: { opacity: 0 },
        show: { opacity: 1 },
    };

    return (
        <HStack justify="center" w="full" bg="black">
            <MotionBox
                display="grid"
                maxW="container.lg"
                px={8}
                gridTemplateColumns="3fr 7fr"
                variants={variants}
                initial={false}
                animate={state}>
                <ProjectNav projects={projects.map((p) => p.title)} />
                {projects.map((project, i) => (
                    <Project key={i} {...project} />
                ))}
            </MotionBox>
        </HStack>
    );
}

/* -------------------------------------------------------------------------- */
/*                                    Home                                    */
/* -------------------------------------------------------------------------- */
type HomeProps = {
    profileBrief: string;
    projects: ProjectProps[];
};

export default function Home({ profileBrief, projects }: HomeProps) {
    const [state, setState] = useState<"hide" | "show">("hide");
    const { scrollY } = useViewportScroll();

    // Detect scrollY position and set navbar state
    useEffect(
        () => scrollY.onChange((y) => setState(y < window.innerHeight - 200 ? "hide" : "show")),
        [] //eslint-disable-line
    );

    return (
        <div tw="w-screen">
            <NavBar />
            <NavBar animate={state} variant="ghost" />
            <HStack
                as="main"
                justify="center"
                minH="calc(100vh - 200px)"
                px={4}
                bgColor="blueGray.200">
                <Grid placeContent="center" maxW="container.lg" gap={8}>
                    <div tw="relative">
                        <AspectRatio
                            h="200px"
                            w="200px"
                            ratio={1}
                            rounded="full"
                            overflow="hidden"
                            justifySelf="center"
                            position="absolute"
                            right="0"
                            bottom={-8}
                            shadow="2xl">
                            <Image
                                src="/assets/profile.jpg"
                                layout="fill"
                                sizes="100%"
                                objectFit="cover"
                            />
                        </AspectRatio>
                    </div>

                    <VStack justify="center" alignItems="start" spacing={8}>
                        <Heading>
                            Hi! I‘m a CS student.
                            <br />I build functional software that{" "}
                            <span tw="text-blue-600 animate-pulse">works.</span>
                        </Heading>
                        <Text color="secondary">{profileBrief}</Text>
                        <Link href="#projects" passHref>
                            <Button
                                alignSelf="end"
                                size="lg"
                                rightIcon={<RocketLaunch />}
                                shadow="lg"
                                onClick={() => {
                                    const e = document.getElementById("#projects");
                                    if (e) {
                                        e.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                }}>
                                See my projects
                            </Button>
                        </Link>
                    </VStack>
                </Grid>
            </HStack>
            <div
                tw="height[200px] bg-black flex flex-col justify-center items-center text-secondary"
                id="#projects">
                <ScrollIndicator />
            </div>

            <ProjectSection state={state} projects={projects} />

            <footer tw="bg-black flex justify-center">
                <div tw="w-96">
                    <ContactForm />
                </div>
            </footer>
        </div>
    );
}

export function getStaticProps(): GetStaticPropsResult<HomeProps> {
    return {
        props: {
            profileBrief:
                "Design and develop functional applications that provide great user experience",
            projects: [
                {
                    image: "assets/ednaUI-monitor.png",
                    title: "ednaUI",
                    brief:
                        "ednaUI is intended to be used in conjunction with ednaServer as an on-site progrmaming and monitoring tool for edna machines. The UI is a easy to use offline browser-based application. This means that it works in a place with no internet connectivity. The user can access the application by connecting securely to the local broadcasted WiFi network. Basic features includes: real-time sensor monitoring, logging, and task scheduling",
                    externalLink: "https://github.com/OPEnSLab-OSU/ednaUI",
                    tags: ["TypeScript", "React", "Webpack (Preact optimized)"],
                },
                {
                    title: "ednaServer",
                    brief:
                        "edanServer is what powered each edna machine. It handles serving the web UI and related backend tasks.",
                    tags: ["C++", "Arduino"],
                    externalLink: "https://github.com/OPEnSLab-OSU/ednaServer",
                },

                {
                    title: "Mentory",
                    brief: `Mentory is a mentorship as a service platform that serves as an all-in-one place for lifelong learning. In today's ever expanding rate of information, Mentory aims to get people from point A to point B as fast as possible through mentorships from domain experts. Imagine being able to learn from the experts in all aspects of life, Mentory provides personalized mentorship that fits your learning style.

                    I setup the our entire development environment including our CI/CD pipeline, static code analysis, UI tools, etc. I also worked on UI, database, server, infrastructure, as well as managing the team.`,
                    externalLink: "https://github.com/kawinie/project-mentory",
                    tags: ["TypeScript", "NextJs", "StrapiCMS"],
                },
            ],
        },
    };
}
