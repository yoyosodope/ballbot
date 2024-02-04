// pages/500.tsx
import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Custom500Props {
  statusCode?: number;
  errorMessage?: ReactNode;
}

const Custom500: NextPage<Custom500Props> = ({ statusCode, errorMessage }) => {
  return (
    <div>
      <h1>Server-side Error {statusCode}</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Custom500;
