import { Badge } from '@chakra-ui/react';

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  let color = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'gray';

  return (
    <Badge colorScheme={color} fontSize='14px' paddingX={2} borderRadius='4px'>{score || "N/A"}</Badge>
  );
}

export default CriticScore