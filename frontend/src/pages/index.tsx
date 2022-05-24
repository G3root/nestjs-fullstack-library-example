import Box from "@mui/material/Box";
import type { NextPage } from "next";
import { AuthorsTable, BooksTable, UserData } from "~/components";

const Home: NextPage = () => {
  return (
    <>
      <UserData />
      <BooksTable />
      <Box py="2rem" />
      <AuthorsTable />
    </>
  );
};

export default Home;
