import React, {FC, ReactNode, useEffect, useState} from 'react';
import {TabPanel} from "@mui/lab";
import {Box, Button, Grid, ImageList, ImageListItem, OutlinedInput, Stack, TextField, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {usePostEventMutation} from "../../../../../store/api/EventApi";
import PhotoButtonUI from "../../../util/PhotoButtonUI";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ToolTipUI from "../../../util/tooltip/ToolTipUI";
import NewEventTabValidation, {NewEventTabInputs} from "../../../../../validation/NewEventTabValidation";
import {EventEntity} from "../../../../../entity/EventEntity";

const NewEventTabUI = () => {
    const navigate = useNavigate();
    const formData = new FormData();
    const [blobs, setBlobs] = useState<Blob[]>([]);
    const [saveEvent, {error, isSuccess, data: event}] = usePostEventMutation();
    const {control, handleSubmit, formState: {errors}} = useForm<NewEventTabInputs>({
        mode: "all",
        resolver: yupResolver(NewEventTabValidation.schema),
        defaultValues: NewEventTabValidation.defaultValues,
    });

    //todo rafactor datepickers validation when smarter
    function onSubmit(data: NewEventTabInputs) {
        formData.append("event",
            new Blob([JSON.stringify({
                    title: data.title,
                    info: data.info,
                    location: data.location,
                    type: data.type,
                    startDate: Date.parse(data.startDate),
                    endDate: Date.parse(data.endDate),
                    alcoholicsIds: data.alcoholicsIds,
                } as EventEntity)],
                {type: 'application/json'}));
        blobs.forEach(blob => formData.append("images", blob));
        saveEvent(formData);
    }

    useEffect(() => {
        if (isSuccess && event) {
            navigate(`/event/${event.id}`, {replace: true});
        }
    }, [isSuccess]);

    function handleImageOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            for (const element of files) {
                const item = element;
                setBlobs(oldBlobs => [...oldBlobs, new Blob([item], {type: item.type})]);
            }
        }
    }

    return (
        <TabPanel value={"0"}
                  sx={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 0 auto",
                      position: "relative",
                      padding: 0
                  }}>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <EventFormContainer>
                            <Typography variant={"h6"}>Select Event Dates</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack direction={"row"} justifyContent="space-between" width={"100%"}>
                                    <Controller name={"startDate"}
                                                control={control}
                                                render={({field}) =>
                                                    <ToolTipUI title={(errors.startDate?.message || "")}
                                                               placement={"top"}
                                                    >
                                                        <TextField
                                                            label="Event Start Date"
                                                            type="datetime-local"
                                                            sx={{width: "47%"}}
                                                            InputLabelProps={{shrink: true}}
                                                            {...field}
                                                            error={!!errors.startDate}
                                                        />
                                                    </ToolTipUI>
                                                }
                                    />
                                    <Controller name={"endDate"}
                                                control={control}
                                                render={({field}) =>
                                                    <ToolTipUI title={(errors.endDate?.message || "")}
                                                               placement={"top"}
                                                    >
                                                        <TextField
                                                            label="Event End Date"
                                                            type="datetime-local"
                                                            sx={{width: "47%"}}
                                                            InputLabelProps={{shrink: true}}
                                                            {...field}
                                                            error={!!errors.endDate}
                                                        />
                                                    </ToolTipUI>
                                                }
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </EventFormContainer>
                        <EventFormContainer>
                            <Typography variant={"h6"}>Fill In Event Information</Typography>
                            <Controller name={"title"}
                                        control={control}
                                        render={({field}) =>
                                            <ToolTipUI title={(errors.title?.message || "")}>
                                                <OutlinedInput type={"string"}
                                                               placeholder={"Title"}
                                                               fullWidth
                                                               {...field}
                                                               error={!!errors.title}
                                                />
                                            </ToolTipUI>
                                        }
                            />
                            <Controller name={"info"}
                                        control={control}
                                        render={({field}) =>
                                            <ToolTipUI title={(errors.info?.message || "")}>
                                                <OutlinedInput type={"string"}
                                                               placeholder={"Information"}
                                                               fullWidth
                                                               {...field}
                                                               error={!!errors.info}
                                                />
                                            </ToolTipUI>
                                        }
                            />
                            <Controller name={"location"}
                                        control={control}
                                        render={({field}) =>
                                            <ToolTipUI title={(errors.location?.message || "")}>
                                                <OutlinedInput type={"string"}
                                                               placeholder={"Location"}
                                                               fullWidth
                                                               {...field}
                                                               error={!!errors.location}
                                                />
                                            </ToolTipUI>
                                        }
                            />
                        </EventFormContainer>
                    </Grid>
                    <Grid item md={6}>
                        <EventFormContainer>
                            <Typography variant={"h6"}>Attach Photos</Typography>
                        </EventFormContainer>
                        <PhotoButtonUI
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImageOnChange(e)}/>
                        {blobs.length}
                        <ImageList sx={{width: "100%", mb: 1}} cols={7}>
                            {blobs.map(blob =>
                                <ImageListItem onClick={() => setBlobs(blobs.filter(b => b != blob))}>
                                    <Box component={"img"}
                                         sx={{width: "100%", height: 64, objectFit: "cover"}}
                                         src={URL.createObjectURL(blob)}
                                    />
                                </ImageListItem>)}
                        </ImageList>
                    </Grid>
                </Grid>
                <Grid item md={12} sx={{display: "flex"}}>
                    <Box sx={{flexGrow: 1}}/>
                    <Button variant={"contained"} type={"submit"}>Save</Button>
                </Grid>
            </Box>
        </TabPanel>
    );
}

export default NewEventTabUI;

interface IEventFromContainer {
    children: ReactNode,
}

const EventFormContainer: FC<IEventFromContainer> = ({children}) => {
    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            mb: 3
        }}>
            {children}
        </Box>
    );
}
