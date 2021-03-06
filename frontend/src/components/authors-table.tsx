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
import EditIcon from "@mui/icons-material/Edit";

import { useHomeData } from "~/hooks";
import { Link } from "./link";

export interface AuthorsTableProps {}

export function AuthorsTable(props: AuthorsTableProps) {
  const { data, mutate } = useHomeData();

  const handleDelete = async (id: number) => {
    const req = await fetch(`http://localhost:3000/author/${id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    mutate();
  };
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" px="2rem">
        <Typography variant="h4" gutterBottom component="div">
          Authors data
        </Typography>
        <Box>
          <Button
            variant="contained"
            component={Link}
            noLinkStyle
            href="/add-authors"
          >
            add authors
          </Button>
        </Box>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>author name</TableCell>
              <TableCell align="right">author id</TableCell>
              <TableCell align="right">delete</TableCell>
              <TableCell align="right">edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.authors !== undefined
              ? data.authors.map((author) => (
                  <TableRow
                    key={author.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {author.name}
                    </TableCell>
                    <TableCell align="right">{author.id}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          handleDelete(author.id);
                        }}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        href={`edit/author/${author.id}`}
                        aria-label="edit"
                      >
                        <EditIcon />
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
