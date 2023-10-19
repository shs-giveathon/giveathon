import Link from 'next/link';
import { FC } from 'react';

interface PathProps {
  path: string;
  route: string;
}

const Path: FC<PathProps> = ({ path, route }) => {
  return (
    <Link href={route}>
      <p className='p-1 transition rounded-md text-white'>{path}</p>
    </Link>
  );
};

export default Path;
