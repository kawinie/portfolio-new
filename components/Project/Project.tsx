import "twin.macro";
import { AspectRatio, Button, Heading, HStack, Text, VStack, Tag } from "@chakra-ui/react";
import { ArrowRight } from "phosphor-react";
import Link from "next/link";
import { link } from "node:fs";

export type ProjectProps = {
    image?: string;
    title: string;
    brief: string;
    externalLink?: string;
    tags: string[];
};

export function Project({ image, title, brief, tags, externalLink }: ProjectProps) {
    return (
        <VStack
            as="article"
            gridColumn={2}
            pb={8}
            spacing={8}
            color="coolGray.400"
            alignItems="start"
            id={title}>
            {image && (
                <AspectRatio w="full" ratio={16 / 9} rounded="xl" overflow="hidden">
                    <img src={image} alt="" />
                </AspectRatio>
            )}
            <Heading as="h3" color="coolGray.200">
                {title}
            </Heading>
            <Text>{brief}</Text>
            <HStack wrap="wrap">
                {tags.map((t) => (
                    <Tag key={t} variant="subtle" colorScheme="whiteAlpha">
                        {t}
                    </Tag>
                ))}
            </HStack>
            <HStack w="full" justify="end" color="black">
                <a href={externalLink}>
                    <Button rightIcon={<ArrowRight />}>Learn More</Button>
                </a>
            </HStack>
        </VStack>
    );
}
