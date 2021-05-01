import "twin.macro";
import { Button, Grid, Input, Textarea } from "@chakra-ui/react";
import { RocketLaunch } from "phosphor-react";

export function ContactForm({ onClick }: { onClick?: () => void }) {
    return (
        <Grid w="full" gap={6} alignItems="center">
            <div tw="-mb-4 text-secondary">Your email</div>
            <Input gridColumn="1/-1" placeholder="captainjack@pirateship.com" />
            <div tw="-mb-4 text-secondary">Leave a message</div>
            <Textarea
                gridColumn="1/-1"
                h={48}
                placeholder="Let's talk about whatever"
                resize="none"
            />
            <Button
                variant="solid"
                onClick={onClick}
                justifySelf="start"
                rightIcon={<RocketLaunch size={20} weight="fill" />}>
                Submit
            </Button>
        </Grid>
    );
}
