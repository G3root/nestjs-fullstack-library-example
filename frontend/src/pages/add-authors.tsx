import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Inputs = {
  name: string;
};

const AddAuthor: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const req = await fetch("http://localhost:3000/author", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    if (req.ok) {
      router.push("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            error={errors?.name ? true : false}
            {...register("name", { required: true })}
          />
        </Stack>
        <Button sx={{ mt: "2rem" }} variant="contained" type="submit">
          submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddAuthor;
