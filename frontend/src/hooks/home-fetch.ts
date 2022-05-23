import useSWR from "swr";
import { fetcher } from "~/lib";

interface useHomeDataInterface {
  books: {
    id: number;
    title: string;
    description: string;
    ISBN: string;
    stock: number;
    author: {
      name: string;
    };
  }[];
  authors: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export function useHomeData() {
  const { data, error, mutate } = useSWR<useHomeDataInterface>(
    "http://localhost:3000/home-page",
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
