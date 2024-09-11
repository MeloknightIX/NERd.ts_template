### Using the template

1. Click "use this template" and "create a new repository" then fill out the initialisation form.
2. On your device, create a root folder for your project.
3. In your new repo in the browser, tap "Code" and copy the URL. 
4. In a terminal, navigate to the root folder and, using the copied URL, type: </br> `git clone https://github.com/[username]/[projectName].git`
5. Install all dependencies: </br> `cd backend && npm install && cd ../frontend && npm install`
6. In backend/private/ add a file called .env with an entry of </br> `PORT=4000`
7. Add all files (except gitignored) and push initial commit: </br> `cd ../ && git add . && git commit -m "initial commit" && git push`

You're ready to start coding!

### Posting Issues

Feel free to post notices on any errors or bugs if you encounter them. <br/>
I'm also open to suggestions, although I can't promise I will work on them as I'm only supporting this template in my free time and for educational purposes. 