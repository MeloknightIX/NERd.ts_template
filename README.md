### Using the template

##### Initialisation

1. Click "use this template" and "create a new repository", then fill out the initialisation form.
2. In your new repo in the browser, tap "Code" and copy the URL.
3. In a terminal, navigate to the folder that should contain your project (the one above the root folder) and, using the copied URL, type: </br> `git clone https://github.com/[username]/[projectName].git`
4. Navigate to the project's root folder and then install all dependencies using: </br> `cd backend && npm install && cd ../frontend && npm install`
5. In backend/private/ add a file called .env with an entry of </br>`NODE_ENV="development"` <br/> `PORT=4000`
6. Edit frontend/public/manifest.json and frontend/public/index.html to suit your project
7. Add all files (except gitignored) and push initial commit: </br> `cd ../ && git add . && git commit -m "initial commit" && git push`

##### Development

1. run from within backend: `npm run dev`
2. run from within frontend: `npm run dev`

##### Production

1. run from within frontend: `npm run build`
2. in backend/private/.env change `NODE_ENV="development"` to `NODE_ENV="production"`
3. run from within backend: `npm run start`

### Posting Issues

Feel free to post notices on any errors or bugs, if you encounter them. <br/>
I'm also open to improvement suggestions, although I can't promise I will work on them as I'm only supporting this template as a hobby.
