import { IncomingMessage, ServerResponse } from 'http';

export default (req: IncomingMessage, res: ServerResponse) => {
    const data = [
        {
            id: 1,
            title: "Are you shopify SuperCEO?",
            website: "apps.shopify.com",
            image: "https://t.ly/Wxcc"
        },
        {
            id: 2,
            title: "Amplify the Jewish Future",
            website: "causematch.com",
            image: "https://t.ly/QK7Z"
        },
        {
            id: 3,
            title: "Hurry up! Grab your discount upto 50%",
            website: "kehloyar.net",
            image: "http://surl.li/ffpcd"
        }
    ];

    res.status(200).json(data);
};
