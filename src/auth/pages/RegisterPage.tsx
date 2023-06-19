import { Grid, TextField, Button } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "react-hook-form";
import { types } from "../../context/adminReducer";
import { useDispatch } from "../../context/ContextAdmin";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = (data) => {
    dispatch({ type: types.login });
    navigate("/");
    console.log(data);
  };

  const password = watch("password");

  return (
    <AuthLayout title="Registrarse">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              error={errors.email}
              helperText={errors.email ? "Ingrese un correo electrónico válido" : ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Contraseña"
              fullWidth
              {...register("password", { required: true })}
              error={errors.password}
              helperText={errors.password ? "Ingrese una contraseña" : ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Verificar Password"
              type="password"
              placeholder="Verificar Password"
              fullWidth
              {...register("passwordVerified", { 
                required: true,
                validate: (value) => value === password || "Las contraseñas no coinciden"
              })}
              error={errors.passwordVerified}
              helperText={errors.passwordVerified ? "Las contraseñas no coinciden" : ""}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" fullWidth type="submit">
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
