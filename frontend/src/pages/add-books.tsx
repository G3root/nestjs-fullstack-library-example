import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useAuthors } from "~/hooks";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Inputs = {
  title: string;
  description: string;
  ISBN: string;
  stock: number;
  author: string;
};

const AddBooks: NextPage = () => {
  const { authors } = useAuthors();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const cleanedData = {
      ...data,
      stock: Number(data.stock),
      author: Number(data.author),
    };

    const req = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cleanedData),
    });

    const res = await req.json();

    if (req.ok) {
      router.push("/");
    }
  };
  const authorState = watch("author", "");
  React.useEffect(() => {
    register("author");
  }, []);

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            variant="outlined"
            error={errors?.title ? true : false}
            {...register("title", { required: true })}
          />
          <TextField
            label="Decription"
            variant="outlined"
            error={errors?.description ? true : false}
            {...register("description", { required: true })}
          />
          <TextField
            label="ISBN"
            variant="outlined"
            error={errors?.ISBN ? true : false}
            {...register("ISBN", { required: true })}
          />
          <TextField
            label="Stock"
            variant="outlined"
            error={errors?.stock ? true : false}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            {...register("stock", { required: true })}
          />

          {authors ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Author</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={authorState ?? ""}
                label="Author"
                onChange={(e) => {
                  setValue("author", e.target.value);
                }}
                required
              >
                {authors.map((author) => (
                  <MenuItem key={author.id} value={String(author.id)}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Stack>
        <Button sx={{ mt: "2rem" }} variant="contained" type="submit">
          submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddBooks;
