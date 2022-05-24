import type { NextPage } from "next";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import MuiLink from "@mui/material/Link";
import { Link } from "~/components";
import { mutate } from "swr";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const req = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();

    if (req.ok) {
      localStorage.setItem("auth-token", res.access_token);
      mutate("http://localhost:3000/user/me");
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
            type="text"
            error={errors?.name ? true : false}
            {...register("name", { required: true })}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            error={errors?.email ? true : false}
            {...register("email", { required: true })}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            error={errors?.password ? true : false}
            {...register("password", { required: true })}
          />
        </Stack>
        <Button sx={{ mt: "2rem" }} variant="contained" type="submit">
          Sign up
        </Button>
      </Box>
    </Container>
  );
};

export default SignupPage;
