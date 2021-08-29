import { Grid, Card, Button, Box, TextField } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import TrackList from '../../components/TrackList';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { MainLayout } from '../../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/actions-creators/track';
import { ITrack } from '../../types/track';

const Index = () => {
    const router = useRouter();
    const {tracks, error} = useTypedSelector(state => state.track);
    const [query, setQuery] = useState<string>('');
    const dispatch = useDispatch() as NextThunkDispatch;
    const [timer, setTimer] = useState(null)

    console.log(tracks, error);

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        )
    }

    return (
        <MainLayout title={"Track list - Music Platform"}>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Track list</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Load</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index;


// export const getServerSideProps = wrapper.getServerSideProps((store) => { //wrapper 7.x
//     console.log(22222)
//     async ({req, res, ...etc}) => {
//         console.log(1111, store, req, res);
//         const dispatch = store.dispatch as NextThunkDispatch;
//         await dispatch(fetchTracks())
//     }
// })

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
     const dispatch = store.dispatch as NextThunkDispatch
     await dispatch(await fetchTracks())
 })



