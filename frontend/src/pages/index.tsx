import Box from "@mui/material/Box";
import type { NextPage } from "next";
import { AuthorsTable, BooksTable } from "~/components";

const Home: NextPage = () => {
  return (
    <>
      <BooksTable />
      <Box py="2rem" />
      <AuthorsTable />
    </>
  );
};

export default Home;
