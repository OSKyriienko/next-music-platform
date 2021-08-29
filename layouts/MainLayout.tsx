import { Container } from '@material-ui/core'
import React from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player'
import Head from 'next/head';

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {


    return (
        <div>
            <Head>
                <title>{title || 'Music Platform'}</title>
                <meta name="description" content={'Music Platform. Description. ' + description}></meta>
                <meta name="robots" content="index, follow"></meta>
                <meta name="keywords" content={keywords || 'Music, tracks'}></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>
            <Navbar />
            <Container style={{margin: '90px 0'}}>
                {children}
            </Container>
            <Player />
        </div>
    )
}
