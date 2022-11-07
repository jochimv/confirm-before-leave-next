import { useRouter } from 'next/router';
import {useState, useCallback, useEffect} from 'react';
import {Box, Button, Modal, Typography, Stack} from "@mui/material";


const UnsavedChangesDialog = ({shouldConfirmLeave }) => {
    const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] = useState(false);
    const [nextRouterPath, setNextRouterPath] = useState();

    const router = useRouter();

    const onRouteChangeStart = useCallback((nextPath) => {
            if (shouldConfirmLeave) {

                setShouldShowLeaveConfirmDialog(true);
                setNextRouterPath(nextPath);

                throw 'Abort route change. Please ignore this error.';

            }
        },
        [shouldConfirmLeave]
    );

    const onRejectRouteChange = () => {
        setShouldShowLeaveConfirmDialog(false);
        setNextRouterPath(null);
    };

    const onConfirmRouteChange = () => {
        setShouldShowLeaveConfirmDialog(false);
        removeListener();
        router.push(nextRouterPath);
    };


    const removeListener = () => {
        router.events.off('routeChangeStart', onRouteChangeStart);
    }

    useEffect(() => {
        router.events.on('routeChangeStart', onRouteChangeStart);
        return removeListener;

    }, [onRouteChangeStart, shouldConfirmLeave]);

    return (
        <Modal open={shouldShowLeaveConfirmDialog} sx={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            <Box sx={{bgcolor: 'common.white', width:500, borderRadius: 1, p: 2}}>
                <Typography variant="h4">You have unsaved changes</Typography>
                <Typography>Leaving this page will discard unsaved changes. Are you sure?</Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Button onClick={onRejectRouteChange} color="success">Back to the form</Button>
                    <Button onClick={onConfirmRouteChange} color="error">Leave this page</Button>
                </Stack>
            </Box>
        </Modal>);

};

export default UnsavedChangesDialog;