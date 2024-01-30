import * as React from 'react';

const useContext = <T>(ctx: React.Context<T | null>): T => {
  const context = React.useContext(ctx);

  if (!context) {
    throw new Error(ctx.displayName + 'must be used within a Provider');
  }

  return context;
};

export default useContext;
