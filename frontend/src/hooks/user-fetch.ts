import * as React from "react";
import useSWR from "swr";
import { useLocalStorage } from "react-use";

interface useUserData {
  id: number;
  name: string;
  email: string;
}

const authKey = "auth-token";

const fetcher = async (url: string, token: string, remove: () => void) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      remove();
    }

    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export function useUser() {
  const [token, setValue, remove] = useLocalStorage<null | string>(
    authKey,
    null,
    { raw: true }
  );
  const { data, error, mutate } = useSWR<useUserData>(
    token ? "http://localhost:3000/user/me" : null,
    (url) => fetcher(url, token as string, remove)
  );
  const logout = () => {
    remove();
    mutate();
  };

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    logout,
  };
}
