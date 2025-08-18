# Markdown Site
This website is a React.js site that compiles markdown to be viewed as a site.

## Features
 - Viewing Markdown pages based on paths in a repository
 - Modifyable JSON file to configure the site.
 - Local Debug viewing of the pages.
 - Sidebar for easy viewing

## Usage
If you are reading this from the public/ folder of the React source, you will need to compile this site. See that repo's main for that.

If you are already in a repository that is pre-compiled! Great!

You will need to configure this site using `data.json`

### Data.json
```json
{
    "debug": "true",
    "markdown": {
        "raw_base": "https://raw.githubusercontent.com/",
        "git_base": "https://github.com/",
        "branch": "main",
        "repo": "CoryBorek/notes-md"
    }
}
```
This is an example of what my personal site used to look like, until I merged it in with a few other features.

Let's go over the pages.

| Item | Usage |
| - | - |
| debug | Whether we are accessing markdown files locally, or over a Github Repository. |
| markdown.raw_base | The site to access the raw source file of the markdown |
| markdown.git_base | Github / Git Repository website |
| markdown.branch | Branch to gather data from |
| markdown.repo | The Repository that the data is in, or the local path if debug is enabled.|

