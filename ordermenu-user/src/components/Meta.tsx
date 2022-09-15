import Head from 'next/head'
import React from 'react'

interface IMetaProps {
    title: string;
    description?: string;
    url?: string;
}

const Meta = ({ title, description, url }: IMetaProps) => {
    const pageTitle = `${title} | OrderMenu`
    return (
        <Head>
            <title>{pageTitle}</title>
            {description && <meta name="description" content={`${description}`} />}
            <meta property="og:title" content={pageTitle} />
            {description && <meta property="og:description" content={`${description}`} />}
            {url && <meta property="og:url" content={`${url}`} />}
            <meta property="og:type" content="website" />
        </Head>
    )
}

export default Meta