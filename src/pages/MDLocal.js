import { useState } from 'react';
import MD from '../components/MD';
import { getHost, loadData } from '../Util';

const MDLocal = (props) => {
    const [md, setMd] = useState("### Loading...");

    const {page} = props;

    async function loadMarkdown() {
        const data = await loadData();
        let host = getHost();
        let site = host + "/builtin/" + page + ".md";
	    let md2 = await fetch(site, {cache: "no-store"}).then(res => {
            if (res.status >= 400) {
                return "### 404: File Not Found!\nThere is no file in the public folder";
            }
            return res.text();
        });

        

        md2 = md2.replaceAll("%WEBPATH%", host + "docs");
        md2 = md2.replaceAll("%GITBASE%", data.markdown.git_base);
        md2 = md2.replaceAll("%REPO%", data.markdown.repo);
        md2 = md2.replaceAll("%BRANCH%", data.markdown.branch);
        md2 = md2.replaceAll("%RAWBASE%", data.markdown.raw_base);
        md2 = md2.replaceAll("%DEBUG%", data.debug);
        
        setMd(md2);
        }

        if (md === "### Loading...") {
            loadMarkdown();
        }
    return (<div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
        <MD>
            {md}
        </MD>
    </div>)
}

export default MDLocal;