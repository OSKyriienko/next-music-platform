import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';

import React, { useState } from 'react'
import { useInput } from '../../hooks/useInput';
import { MainLayout } from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
            console.log(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <MainLayout
            title={"Music Platform - " + track.name + " - " + track.artist}
            keywords={'Music, artists, ' + track.name + ", " + track.artist}
        >
            <Button variant={'outlined'} style={{fontSize: 32}} onClick={() => router.push('/tracks')} >
                Back to List
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src = {'http://localhost:5000/' + track.picture} width={200} height={200} />
                <div style={{marginLeft: 30}}>
                    <h1>Name - {track.name}</h1>
                    <h1>Artist - {track.artist}</h1>
                    <h1>Listens - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Words</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField
                    {...username}
                    label="Your name"
                    fullWidth
                />
                <TextField
                    {...text}
                    label="Comments"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Send</Button>
            </Grid>
            <div>
                {track.comments.map((comment, index) =>
                    <div key={index}>
                        <div>Author - {comment.username}</div>
                        <div>Comments - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}

