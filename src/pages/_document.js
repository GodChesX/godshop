import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        let pageProps = {}

        // if (ctx.req) {
        //     if (ctx.req.useragent && ctx.req.useragent.isIE && ctx.req.originalUrl != '/about_ie') {
        //         if (ctx.res) {
        //             ctx.res.writeHead(302, {
        //                 Location: '/about_ie'
        //             })
        //             ctx.res.end()
        //         } else {
        //             Router.push('/about_ie')
        //         }
        //     }
        // }
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {

        return (
            <Html lang="th">
                <Head>
                {/*    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"*/}
                {/*          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"*/}
                {/*          crossOrigin="anonymous"/>*/}
                {/*    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"*/}
                {/*            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"*/}
                {/*            crossOrigin="anonymous"></script>*/}
                {/*        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>*/}
                {/*        <link rel="icon" href="/favicon.ico"/>*/}
                </Head>
                <body className="pr-0">
                {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIKl_f5xW4uwBB3wkSvY1eo_dzfUKte2c&libraries=places"></script> */}
                <Main />
                <NextScript />
                {/* Global site tag (gtag.js) - Google Analytics */}

                {/* <script async type="text/javascript">
            {
              window.dataLayer = window.dataLayer || [],
              function gtag() {
                dataLayer.push(arguments)
              },
              gtag('js', new Date()),
              gtag('config', 'UA-111964915-1')
            }
          </script> */}
                </body>
            </Html>
        )
    }
}

export default MyDocument
