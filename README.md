<h3>Using the Template</h3>
<details>
    <summary><h5>Initialisation</h5></summary>
    <ol>
    <li>Click "use this template" and "create a new repository", then fill out the initialisation form.</li>
    <li>In your new repo in the browser, tap "Code" and copy the URL.</li>
    <li>In a terminal, navigate to the folder that should contain your project (the one above the root folder) and, using the copied URL, type: </br> <code>git clone https://github.com/[username]/[projectName].git</code></li>
    <li>Navigate to the project's root folder and then install all dependencies using: </br> <code>cd backend && npm install && cd ../frontend && npm install</code></li>
    <li>In backend/private/ add a file called .env with an entry of </br><code>NODE_ENV="development"</code><br/><code>PORT=4000</code></li>
    <li>Edit frontend/public/manifest.json and frontend/public/index.html to suit your project</li>
    <li>Add all files (except gitignored) and push initial commit: </br> <code>cd ../ && git add . && git commit -m "initial commit" && git push</code></li>
    </ol>
</details>
<details>
    <summary><h5>Development</h5></summary>
    <ol>
    <li>run from within backend: <code>npm run dev</code></li>
    <li>run from within frontend: <code>npm run dev</code></li>
    </ol>
</details>
<details>
    <summary><h5>Production</h5></summary>
    <ol>
    <li>run from within frontend: <code>npm run build</code></li>
    <li>in backend/private/.env change <code>NODE_ENV="development"</code> to <code>NODE_ENV="production"</code></li>
    <li>run from within backend: <code>npm run start</code></li>
    </ol>
</details>

<h3>Posting Issues</h3>
Feel free to post notices on any errors or bugs, if you encounter them. <br/>
I'm also open to improvement suggestions, although I can't promise I will work on them as I'm only supporting this template as a hobby.
