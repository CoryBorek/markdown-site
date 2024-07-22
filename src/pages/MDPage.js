import { useState } from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm'
import { useLocation } from 'react-router-dom';


const MDPage = () => {

    const location = useLocation();
    const [md, setMd] = useState("Loading...");
    let id = location.pathname;

    if (id === "") {
        id = "/"
    }

    if (id.endsWith("/")) {
        id += "index"
    }


    let site = process.env.REACT_APP_RAW_BASE
     + process.env.REACT_APP_REPO
      + "/"
       + process.env.REACT_APP_BRANCH + "/" + id  + ".md"


    async function loadData() {
        setMd(await fetch(site, {cache: "no-store"}).then(res => {
            console.log(res);
            if (res.status >= 400) {
                return "### 404: File Not Found!\nTry another page, if that doesn't work, go to " + 
                process.env.REACT_APP_GIT_BASE + process.env.REACT_APP_REPO + "/.";
            }
            return res.text();
        }))
    }

    loadData();
    return (<div>
        <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
            {md}
        </Markdown>
    </div>)
}

export default MDPage;