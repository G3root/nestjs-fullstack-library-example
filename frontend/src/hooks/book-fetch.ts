import useSWR from "swr";
import { fetcher } from "~/lib";

interface useBooksData {
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

export function useBooks() {
  const { data, error, mutate } = useSWR<useBooksData>(
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
