import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MD from '../components/MD';
const MDPage = () => {
    const location = useLocation();
    const [md, setMd] = useState("### Loading...");
    let id = location.pathname;

    if (id === "") {
        id = "/"
    }

    if (id.endsWith("/")) {
        id += "index"
    }


    let site = process.env.REACT_APP_DEBUG === "true" ? "http://localhost:3000/" + process.env.REACT_APP_REPO + "/" + id + ".md" : process.env.REACT_APP_RAW_BASE
     + process.env.REACT_APP_REPO
      + "/"
       + process.env.REACT_APP_BRANCH + "/" + id  + ".md"


    async function loadData() {
        setMd(await fetch(site, {cache: "no-store"}).then(res => {
            console.log(res);
            if (res.status >= 400) {
                return "### 404: File Not Found!\nTry another page, if that doesn't work, go to [" + 
                process.env.REACT_APP_GIT_BASE + process.env.REACT_APP_REPO + "/](" + process.env.REACT_APP_GIT_BASE + process.env.REACT_APP_REPO + "/).";
            }
            return res.text();
        }))
    }

    loadData();
    return (<div>
        <MD>
            {md}
        </MD>
    </div>)
}

export default MDPage;