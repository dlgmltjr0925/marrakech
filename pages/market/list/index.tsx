import { GetServerSideProps, NextPage } from 'next';

const PlayList: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/market/list/1',
      permanent: true,
    },
  };
};

export default PlayList;
