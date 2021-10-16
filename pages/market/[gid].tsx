import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

const Game: NextPage = () => {
  const router = useRouter();

  const { gid } = router.query;

  return <div>{`Game : ${gid}`}</div>;
};

export default Game;
