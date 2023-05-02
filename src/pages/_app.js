import { Grommet } from 'grommet';
import "../../public/style/global.css";
import Head from "next/head";
import React from 'react';
import {wrapper} from '../redux/store';
import { appWithTranslation } from '../../i18n';
function SafeHydrate({ children }) {
    return (
        <div suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    )
}
function MyApp({Component,pageProps})
{
    return(
        <Grommet>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                      crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                        crossOrigin="anonymous"></script>
                <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <SafeHydrate>
                    <Component {...pageProps}/>
            </SafeHydrate>
        </Grommet>
    )
}

export default appWithTranslation(wrapper.withRedux(MyApp));

