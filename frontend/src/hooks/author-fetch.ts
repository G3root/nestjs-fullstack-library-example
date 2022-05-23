import useSWR from "swr";
import { fetcher } from "~/lib";

interface useAuthorsData {
  id: number;
  name: string;
}

export function useAuthors() {
  const { data, error, mutate } = useSWR<useAuthorsData[]>(
    "http://localhost:3000/author",
    fetcher
  );

  return {
    authors: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
