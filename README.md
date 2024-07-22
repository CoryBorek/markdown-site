# Git Markdown Page System

This is a React Website that builds a site that you can host, that views the markdown files in a Git repository.

For example, https://coryborek.github.io

shows the files at https://github.com/CoryBorek/notes-md/

This is a way to make sites a little easier (though not the best looking, i'd admit).

Feel free to fork this repo, and use it for your own needs.

To run it, clone this repo, copy the `env_example` file to `.env` and change the config to a site you see fit.

then run `npm build`

from there, you can see that the output is in `build/`

What I usually do, is set up a git repo, set it as my website git repo, and force push the site to the repo, that uses github pages.