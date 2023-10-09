import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "/styles/stylesheet.css";
import {
  Grid,
  Container,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import header from "../assets/negative-coaster-icon.png";

export default function Register() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const register = async () => {
    try {
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: credentials,
      });

      // const data = await api.createUser(credentials);

      console.log(data.message);
      setData(data.message);
      auth.login(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setData(error.response.data.message);
    }
  };
  return (
    <div>
      <Container display="flex" maxWidth="sm" align="center">
        <Typography variant="h4" sx={{ mt: 5 }}>
          Create your profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>
              <img src={header} alt="Park Quest" className="logo-register" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "25ch" },
                mt: 5,
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  value={email}
                  onChange={handleChange}
                  name="email"
                  className="textfield"
                  label="Email"
                  variant="outlined"
                  color="warning"
                  type="text"
                />
                <TextField
                  value={password}
                  onChange={handleChange}
                  name="password"
                  className="textfield"
                  label="Password"
                  variant="outlined"
                  color="warning"
                  type="password"
                />
              </div>
              <Button
                onClick={register}
                variant="contained"
                color="warning"
                sx={{
                  ml: 1.5,
                  mt: 2,
                }}
              >
                Sign up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}