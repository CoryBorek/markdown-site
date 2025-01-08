import { useState } from 'react';
import MD from '../components/MD';

const MDLocal = (props) => {
    const [md, setMd] = useState("### Loading...");

    const {page} = props;
    let host = window.location.host;

    host = host.includes("localhost") ? "http://" + host : "https://" + host;

    let site = host + "/" + page + ".md";

    async function loadData() {
	let md2 = await fetch(site, {cache: "no-store"}).then(res => {
            console.log(res);
            if (res.status >= 400) {
                return "### 404: File Not Found!\nThere needs to be a status page in the public folder.";
            }
            return res.text();
        });
    md2 = md2.replaceAll("%WEBPATH%", host);
    md2 = md2.replaceAll("%GITBASE%", process.env.REACT_APP_GIT_BASE);
    md2 = md2.replaceAll("%REPO%", process.env.REACT_APP_REPO);
    md2 = md2.replaceAll("%BRANCH%", process.env.REACT_APP_BRANCH);
    md2 = md2.replaceAll("%RAWBASE%", process.env.REACT_APP_RAW_BASE);
    md2 = md2.replaceAll("%DEBUG%", process.env.REACT_APP_DEBUG);
    
    setMd(md2);
    }

    loadData();
    return (<div>
        <MD>
            {md}
        </MD>
    </div>)
}

export default MDLocal;
