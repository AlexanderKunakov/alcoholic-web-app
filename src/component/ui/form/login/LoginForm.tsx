import React, {useState} from 'react';
import {useLoginMutation} from "../../../../store/api/AuthApi";

import {Box, Container, Grid, IconButton, InputAdornment, OutlinedInput, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {UserCredentialsEntity} from "../../../../entity/UserCredentialsEntity";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import ToolTipUI from "../../util/tooltip/ToolTipUI";
import Styles from "./Styles";

type Inputs = {
    login: string,
    password: string,
};

const schema = yup.object({
    login: yup.string()
        .required("Login is required")
        .trim(),
    password: yup.string()
        .required("Password is required")
        .trim(),
});

const LoginForm = () => {
    const [loginUser, {isLoading, error}] = useLoginMutation();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    async function onSubmit(data: UserCredentialsEntity) {
        loginUser(data);
    }

    return (
        <>
            <Container component={"main"} maxWidth={"xs"}>
                <Box sx={Styles.box}>
                    <Typography sx={Styles.welcome} variant={"h6"}>Welcome to</Typography>
                    <Typography sx={Styles.buhinder} variant={"h3"}>BUHINDER</Typography>
                    <ToolTipUI title={""} placement={"top"}>
                        <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={Styles.form}>
                            <Controller
                                name={"login"}
                                control={control}
                                defaultValue={""}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.login?.message || "")}>
                                        <OutlinedInput placeholder={"Login"}
                                                       id={"login"}
                                                       fullWidth
                                                       autoFocus
                                                       type={"text"}
                                                       {...field}
                                        />
                                    </ToolTipUI>
                                }
                            />
                            <Controller
                                name={"password"}
                                control={control}
                                defaultValue={""}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.password?.message || "")}>
                                        <OutlinedInput placeholder={"Password"}
                                                       fullWidth
                                                       type={isVisible ? 'text' : 'password'}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   onClick={() => setIsVisible(!isVisible)}
                                                                   onMouseDown={e => e.preventDefault()}
                                                                   edge={"end"}
                                                               >
                                                                   {isVisible ? <VisibilityOff/> : <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                       {...field}
                                        />
                                    </ToolTipUI>}
                            />
                            <LoadingButton loading={isLoading}
                                           type={"submit"}
                                           fullWidth
                                           variant={"contained"}
                                           sx={Styles.submit}
                                           size={"large"}
                            >
                                Sign In
                            </LoadingButton>
                        </Box>
                    </ToolTipUI>
                    <Grid container sx={Styles.register}>
                        <Grid item>
                            <Link to={"/register"}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default LoginForm;
