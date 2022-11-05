import React, {useEffect, useState} from 'react';
import {useRegisterMutation} from "../../../../store/api/AuthApi";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {Link, useNavigate} from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ToolTipUI from "../../util/tooltip/ToolTipUI";
import Styles from "./Styles";
import PortraitIcon from '@mui/icons-material/Portrait';
import DeleteIcon from '@mui/icons-material/Delete';

type Inputs = {
    firstname: string,
    lastName: string,
    age: number,
    email: string,
    login: string,
    password: string,
};

const schema = yup.object({
    firstname: yup.string()
        .required("First Name is required")
        .max(20, "First Name must be less than or equal to 20")
        .trim(),
    lastName: yup.string()
        .required("Last Name is required")
        .max(30, "Password must be less than or equal to 30")
        .trim(),
    age: yup.number()
        .min(1, "Age must be greater than or equal to 1")
        .max(150, "Age must be less than or equal to 150")
        .integer()
        .truncate(),
    email: yup.string()
        .required("Email is required")
        .email("Email must be a valid email")
        .trim(),
    login: yup.string()
        .required("Login is required")
        .max(20, "Login must be less than or equal to 20")
        .trim(),
    password: yup.string()
        .required("Password is required")
        .max(30, "Password must be less than or equal to 30")
        .trim(),
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const formData = new FormData();
    const [userImage, setUserImage] = useState<Blob | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [register, {isLoading, error, isSuccess}] = useRegisterMutation();
    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    function onSubmit(data: Inputs) {
        formData.append("user", new Blob([JSON.stringify(data)], {type: 'application/json'}));
        if (userImage) {
            formData.append("image", userImage);
        }
        register(formData);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            setUserImage(new Blob([files[0]], {type: files[0].type}));
        }
    }

    function handleImageClick(e: React.MouseEvent<HTMLInputElement>) {
        // @ts-ignore
        e.target.value = null
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/login", {replace: true});
        }
    }, [isSuccess]);

    return (
        <Container maxWidth={"xs"}>
            <CssBaseline/>
            <Box sx={Styles.box}>
                {userImage === null
                    ? <Avatar sx={Styles.avatar}>
                        <AppRegistrationIcon/>
                    </Avatar>
                    : <Avatar
                        src={URL.createObjectURL(userImage)}
                        sx={Styles.photo}
                    />
                }
                <Typography sx={Styles.signUp} variant={"h5"}>Sign Up</Typography>
                <Box component={"form"}
                     onSubmit={handleSubmit(onSubmit)}
                     sx={Styles.form}>
                    <Controller name={"firstname"}
                                control={control}
                                defaultValue={""}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.firstname?.message || "")}>
                                        <OutlinedInput type={"text"}
                                                       placeholder={"First Name"}
                                                       fullWidth
                                                       {...field}
                                        />
                                    </ToolTipUI>
                                }
                    />
                    <Controller name={"lastName"}
                                control={control}
                                defaultValue={""}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.lastName?.message || "")}>
                                        <OutlinedInput type={"text"}
                                                       placeholder={"Last Name"}
                                                       fullWidth
                                                       {...field}
                                        />
                                    </ToolTipUI>
                                }
                    />
                    <Controller name={"age"}
                                control={control}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.age?.message || "")}>
                                        <OutlinedInput type={"number"}
                                                       placeholder={"Age"}
                                                       fullWidth
                                                       {...field}
                                        />
                                    </ToolTipUI>
                                }
                    />
                    <Controller name={"email"}
                                control={control}
                                defaultValue={""}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.email?.message || "")}>
                                        <OutlinedInput type={"text"}
                                                       placeholder={"Email"}
                                                       fullWidth
                                                       {...field}
                                        />
                                    </ToolTipUI>
                                }
                    />
                    <Controller name={"login"}
                                control={control}
                                defaultValue={""}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.login?.message || "")}>
                                        <OutlinedInput type={"text"}
                                                       placeholder={"Login"}
                                                       fullWidth
                                                       {...field}
                                        />
                                    </ToolTipUI>
                                }
                    />
                    <Controller name={"password"}
                                control={control}
                                defaultValue={""}
                                render={({field}) =>
                                    <ToolTipUI title={(errors.password?.message || "")}>
                                        <OutlinedInput type={isVisible ? 'text' : 'password'}
                                                       placeholder={"Password"}
                                                       fullWidth
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   disabled={isLoading}
                                                                   aria-label={"toggle password visibility"}
                                                                   onClick={() => setIsVisible(!isVisible)}
                                                                   onMouseDown={e => e.preventDefault()}
                                                                   edge={"end"}
                                                               >
                                                                   {isVisible ? <VisibilityOff/> :
                                                                       <Visibility/>}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                       {...field}
                                        />
                                    </ToolTipUI>
                                }
                    />
                    <Box sx={Styles.photoButton}>
                        <Button component={"label"}
                                startIcon={<PortraitIcon/>}
                                variant={"outlined"}
                                size={"large"}
                                fullWidth
                        >
                            {userImage === null ? "Attach Photo" : "Change Photo"}
                            <input type="file" accept="image/jpeg" hidden onChange={e => handleImageChange(e)}
                                   onClick={e => handleImageClick(e)}/>
                        </Button>
                        {userImage !== null &&
                            <IconButton sx={Styles.delete} onClick={() => setUserImage(null)}>
                                <DeleteIcon/>
                            </IconButton>
                        }
                    </Box>
                    <LoadingButton
                        loading={isLoading}
                        type={"submit"}
                        fullWidth
                        variant={"contained"}
                        sx={Styles.submit}
                        size={"large"}
                    >
                        Sign Up
                    </LoadingButton>
                </Box>
                <Grid container sx={Styles.login}>
                    <Grid item>
                        <Link to={"/login"}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default RegisterForm;
