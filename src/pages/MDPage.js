import fetch from 'cross-fetch';
import { useState } from 'react';
import Markdown from 'react-markdown';

const MDPage = (props) => {

    const [md, setMd] = useState("Loading...");
    let id = props.id.replace("$", "/");

    if (id.endsWith("/") === true) {
        id += "index";
    }

    let site = process.env.REACT_APP_SITE + id  + ".md"


    async function loadData() {
        setMd(await fetch(site).then(res => {
            if (res.status >= 400) {
                return "# Not Found!"
            }
            return res.text();
        }))
    }

    loadData();
    return (<div>
        <Markdown>
            {md}
        </Markdown>
    </div>)
}

export default MDPage;