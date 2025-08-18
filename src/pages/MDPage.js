import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MD from '../components/MD';
import { getHost, loadData } from '../Util';
const MDPage = (props) => {
    const location = useLocation();
    const [md, setMd] = useState("### Loading...");
    let id = location.pathname;

    let types = [".c", ".java", "Makefile", ".asm", ".s"];

    let host = getHost();
    
    let code = false;
    let codeType = "";

    for (var i in types) {
	console.log(i);
	if (id.replaceAll("_", ".").endsWith(types[i])) {
	    site += id.replaceAll("_", ".");
	    code = true;
	    codeType = types[i].substring(1);
	}
    }

    if (id === "") {
        id = "/"
    }

    if (id.endsWith("/")) {
        id += "index"
    }

    async function loadMarkdown(code, codeType) {

        const data = await loadData();

        let site = data.debug === "true" ? getHost() + data.markdown.repo + "/" : data.markdown.raw_base + data.markdown.repo + "/" + data.markdown.branch + "/";
	    
        if (code === false) {
    	    site += id + ".md";
        }
        
        let md2 = await fetch(site, {cache: "no-store"}).then(res => {
            if (res.status >= 400) {
                return "### 404: File Not Found!\nTry another page, if that doesn't work, go to [" + 
                data.markdown.git_base + data.markdown.repo + "/](" + data.markdown.git_base + data.markdown.repo + "/).";
            }
            return res.text();
        });

        

        md2 = md2.replaceAll("%WEBPATH%", host + "notes");
        md2 = md2.replaceAll("%GITBASE%", data.markdown.git_base);
        md2 = md2.replaceAll("%REPO%", data.markdown.repo);
        md2 = md2.replaceAll("%BRANCH%", data.markdown.branch);
        md2 = md2.replaceAll("%RAWBASE%", data.markdown.raw_base);
        md2 = md2.replaceAll("%DEBUG%", data.debug);

        if (code === true) {
            md2 = "# " + id.replaceAll("_", ".") + "\n```" + codeType + "\n" + md2 + "\n```\n\n[Source Code](" + site + ")";
        }
        setMd(md2);
    }

    if (md === "### Loading...") {
        loadMarkdown(code, codeType);
    }
    return (<div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
        <MD>
            {md}
        </MD>
    </div>)
}

export default MDPage;