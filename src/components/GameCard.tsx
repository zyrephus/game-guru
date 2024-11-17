import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card
      as={Link}
      to={"/games/" + game.slug}
      overflow="hidden"
      borderRadius={10}
      border="1px solid"
      borderColor="whiteAlpha.300"
      transition="border-color 0.4s ease"
      _hover={{
        borderColor: "whiteAlpha.700"
      }}
    >
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        {/* Title */}
        <HStack justifyContent="space-between" marginBottom={3}>
          {/* Platforms */}
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          {/* Critic Score */}
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">
          {game.name}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
