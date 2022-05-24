import useSWR from "swr";

interface useUserData {
  id: number;
  name: string;
  email: string;
}

let token: any = null;
if (typeof window !== "undefined") {
  const data = localStorage.getItem("auth-token");
  if (data) {
    token = data;
  }
}

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("auth-token");
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
  const { data, error, mutate } = useSWR<useUserData[]>(
    token ? "http://localhost:3000/user/me" : null,
    (url) => fetcher(url, token)
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
