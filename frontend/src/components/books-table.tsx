import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useBooks } from "~/hooks";
import { Link } from "./link";

export interface BooksTableProps {}

export function BooksTable(props: BooksTableProps) {
  const { data, mutate } = useBooks();

  const handleDelete = async (id: number) => {
    const req = await fetch(`http://localhost:3000/book/${id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    mutate();
  };
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" px="2rem">
        <Typography variant="h4" gutterBottom component="div">
          Books data
        </Typography>
        <Box>
          <Button
            variant="contained"
            component={Link}
            noLinkStyle
            href="/add-books"
          >
            add books
          </Button>
        </Box>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>book title</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">ISBN</TableCell>
              <TableCell align="right">stock</TableCell>
              <TableCell align="right">author name</TableCell>
              <TableCell align="right">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.books !== undefined
              ? data.books.map((book) => (
                  <TableRow
                    key={book.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {book.title}
                    </TableCell>
                    <TableCell align="right">{book.description}</TableCell>
                    <TableCell align="right">{book.ISBN}</TableCell>
                    <TableCell align="right">{book.stock}</TableCell>
                    <TableCell align="right">{book.author.name}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          handleDelete(book.id);
                        }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
