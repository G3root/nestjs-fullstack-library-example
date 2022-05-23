import type { NextPage } from "next";
import { GetServerSideProps } from "next";
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

interface props {
  data: {
    name: string;
  };
}

const EditAuthor = ({ data }: props) => {
  const router = useRouter();
  const { pid } = router.query;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: data.name,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const req = await fetch(`http://localhost:3000/author/${pid}`, {
      method: "PATCH",
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

export default EditAuthor;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.pid as string;

  try {
    const req = await fetch(`http://localhost:3000/author/${id}`, {
      method: "GET",
    });
    const res = await req.json();
    if (!req.ok) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return {
      props: {
        data: res,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
