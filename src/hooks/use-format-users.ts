import { useMemo } from 'react';

interface UserOptions {
  search: {
    edges: [User];
  };
}

interface User {
  node: {
    login: string;
    name: string;
    avatarUrl: string;
  };
}

export interface SelectOption {
  value: string;
  label: string;
  iconSrc: string;
}

type SelectOptions = Array<SelectOption>;

export const useFormatUser = (options: UserOptions): SelectOptions =>
  useMemo(() => {
    if (options && options.search && options.search.edges) {
      return options.search.edges.map(
        ({ node: { login, name, avatarUrl } }: User): SelectOption => ({
          iconSrc: avatarUrl,
          label: name ? `${name} (${login})` : login,
          value: login,
        }),
      );
    }
    return [];
  }, [options]);
