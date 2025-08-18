import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MD from '../components/MD';
import { getHost, loadData } from '../Util';
import MDPage from './MDPage';
const SidebarPage = (props) => {
    const location = useLocation();
    const [md, setMd] = useState("### Loading...");
    let id = location.pathname;
    let host = getHost();

        if (id === "") {
            id = "/"
        }

    
        if (id.indexOf("/") !== -1) {
            id = id.substring(0, id.lastIndexOf("/") + 1);
        }
        id += "sidebar"
    async function loadMarkdown() {



        const data = await loadData();

        let site = data.debug === "true" ? getHost() + data.markdown.repo + "/" : data.markdown.raw_base + data.markdown.repo + "/" + data.markdown.branch + "/";
	    
    	    site += id + ".md";

        
        console.log("site: " + site)
        let md2 = await fetch(site, {cache: "no-store"}).then(res => {
            if (res.status >= 400) {
                return "### no_sidebar_400";
            }
            return res.text();
        });

        

        md2 = md2.replaceAll("%WEBPATH%", host + "notes");
        md2 = md2.replaceAll("%GITBASE%", data.markdown.git_base);
        md2 = md2.replaceAll("%REPO%", data.markdown.repo);
        md2 = md2.replaceAll("%BRANCH%", data.markdown.branch);
        md2 = md2.replaceAll("%RAWBASE%", data.markdown.raw_base);
        md2 = md2.replaceAll("%DEBUG%", process.env.REACT_APP_DEBUG);

        setMd(md2);
    }

    if (md === "### Loading...") {
        loadMarkdown();
    }

    if (md === "### no_sidebar_400") {
        return (<MDPage />)
    }
    else return (
        <div>
            <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
                <div className="offcanvas-header">
                    <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body px-0">
                    <MD>{md}</MD>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col min-vh-100 py-3">
                        <button className="btn float-end btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
                            <i>Menu</i>
                        </button>
                        <MDPage />
                    </div>
                </div>
            </div>
        </div>);
}

export default SidebarPage;