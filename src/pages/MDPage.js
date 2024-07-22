import fetch from 'cross-fetch';
import { useState } from 'react';
import Markdown from 'react-markdown';

const MDPage = (props) => {

    const [md, setMd] = useState("Loading...");
    let id = props.id.replace("$", "/");

    if (id.endsWith("/") === true) {
        id += "index";
    }

    let site = process.env.REACT_APP_RAW_BASE
     + process.env.REACT_APP_REPO
      + "/"
       + process.env.REACT_APP_BRANCH + "/" + id  + ".md"


    async function loadData() {
        setMd(await fetch(site).then(res => {
            if (res.status >= 400) {
                return "### 404: File Not Found!\nTry another page, if that doesn't work, go to " + 
                process.env.REACT_APP_GIT_BASE + process.env.REACT_APP_REPO + "/.";
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