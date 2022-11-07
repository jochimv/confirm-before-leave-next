import { useState} from "react";
import {useRouter} from "next/router";
import {Button, TextField, styled, Stack, Typography} from "@mui/material";
import UnsavedChangesDialog from "./UnsavedChangesDialog";
import { useForm } from "react-hook-form";


const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    marginBottom: 10
});

export default function FirstForm() {
    const router = useRouter();
    const [data, setData] = useState();
    const { register, handleSubmit, formState: {isDirty}, reset } = useForm();

    const handleSubmitForm = handleSubmit((data) => {
        setData(JSON.stringify(data));
        reset();
    });

    return (
<>
            <Form onSubmit={handleSubmitForm}>
                <TextField label="First name" {...register("firstName")} />
                <TextField label="Last name" {...register("lastName")} />
            </Form>
            <Stack direction="row" columnGap={1}>
                <Button type="submit" color="success" variant="contained" onClick={handleSubmitForm}>Submit form</Button>
                <Button onClick={() => router.push('/')} color="error" variant="contained">Go home</Button>
            </Stack>
            <UnsavedChangesDialog shouldConfirmLeave={isDirty} />
            <Typography sx={{marginTop: 1}}>{data}</Typography>
</>
    );
}