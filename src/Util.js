
/**
 * Loads the JSON from the local "data.json"
 * @returns JSON data or an error.
 */
async function loadData() {
        const site = getHost() + "data.json";
        let data = await fetch(site, {cache: "no-store"}).then(res => {
            if (res.status >= 400) {
                return {
                    debug: "true",
                    markdown: {
                        raw_base: "",
                        git_base: "",
                        branch: "main",
                        repo: "fallback/"
                    }
                };
            }
            return res.json();
        })
        return data;
}

function getHost() {
    let host = window.location.host;
    host = host.includes("localhost") ? "http://" + host : "https://" + host;
    host += "/";
    return host;
}


export {getHost, loadData}