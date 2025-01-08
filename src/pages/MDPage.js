import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MD from '../components/MD';
const MDPage = () => {
    const location = useLocation();
    const [md, setMd] = useState("### Loading...");
    let id = location.pathname;

    let types = [".c", ".java"];

    let site = process.env.REACT_APP_DEBUG === "true" ? "http://localhost:3000/" + process.env.REACT_APP_REPO + "/" : process.env.REACT_APP_RAW_BASE + process.env.REACT_APP_REPO + "/" + process.env.REACT_APP_BRANCH + "/";

    let code = false;
    let codeType = "";

    for (var i in types) {
	console.log(i);
	if (id.replaceAll("_", ".").endsWith(types[i])) {
	    site += id.replaceAll("_", ".");
	    code = true;
	    console.log(types[i]);
	    codeType = types[i].substring(1);
	}
    }
    
    if (id === "") {
        id = "/"
    }

    if (id.endsWith("/")) {
        id += "index"
    }

    if (code === false) {
    	site += id + ".md";
    }

    async function loadData(code, codeType) {
	let md2 = await fetch(site, {cache: "no-store"}).then(res => {
            console.log(res);
            if (res.status >= 400) {
                return "### 404: File Not Found!\nTry another page, if that doesn't work, go to [" + 
                process.env.REACT_APP_GIT_BASE + process.env.REACT_APP_REPO + "/](" + process.env.REACT_APP_GIT_BASE + process.env.REACT_APP_REPO + "/).";
            }
            return res.text();
        });
	
	if (code === true) {
		md2 = "# " + id.replaceAll("_", ".") + "\n```" + codeType + md2 + "\n```\n\n[Source Code](" + site + ")";
	}
        setMd(md2);
    }

    loadData(code, codeType);
    return (<div>
        <MD>
            {md}
        </MD>
    </div>)
}

export default MDPage;
