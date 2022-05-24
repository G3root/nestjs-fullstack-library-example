import * as React from "react";
import { useUser } from "~/hooks";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export interface UserDataProps {}

export function UserData(props: UserDataProps) {
  const { user, logout } = useUser();

  return (
    <Container>
      {user ? (
        <Box mb="2rem">
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            user data
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary={`name: ${user.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`email: ${user.email}`} />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                onClick={() => {
                  logout();
                }}
              >
                logout
              </Button>
            </ListItem>
          </List>
        </Box>
      ) : (
        <Box>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            user is not authenticated
          </Typography>
        </Box>
      )}
    </Container>
  );
}
