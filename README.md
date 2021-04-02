**Libris Log**<br>
Libris Log is a virtual library where you can track, log, and analyze your reading habits. 
<br>
<br>
Check out the demo here: https://www.youtube.com/watch?v=4pz1FlaogtA
<br>
<br>
On the back end I used Node JS, Express, MongoDB and Mongoose, and JWT for authentication. On the front end I used React. I used the Google Books API to provide cover art and publishing information for any added books.
<br>
<br>
![LandingPage](https://github.com/maywoollcott/librislog/blob/main/screenshots/landing.PNG)
**Landing**
<br>
<br>
![RegistrationPage](https://github.com/maywoollcott/librislog/blob/main/screenshots/registration.PNG)
**Registration**
<br>
<br>
![Library](https://github.com/maywoollcott/librislog/blob/main/screenshots/library.PNG)
**Library**
<br>
On this page, view the books that you've finished, are currently reading, and would like to read.
<br>
<br>
![FinishedBook](https://github.com/maywoollcott/librislog/blob/main/screenshots/details.PNG)
**Finished Book Stats**
<br>
Click "check stats" to view your reading stats for a finished book. Check out the number of reading sessions it took you to finish, time spent reading, average reading pace, average reading session length, and longest reading session.
<br>
<br>
![Add Book](https://github.com/maywoollcott/librislog/blob/main/screenshots/search.PNG)
**Search for a Book**
<br>
Search by title and author name.
<br>
<br>
![FinishedBook](https://github.com/maywoollcott/librislog/blob/main/screenshots/search1.PNG)
**Search Results**
<br>
A list of options is returned based on your search. Select whichever option is the correct book or edition. If none of them are correct, you can search by ISBN or enter the info manually.
<br>
<br>
![Library](https://github.com/maywoollcott/librislog/blob/main/screenshots/search2.PNG)
**Add Book**
<br>
Select whether you've started the book (enter the date started), want to read it, or have already finished it (enter the date completed and your rating). Click "add book" and it will be added to your library.
<br>
<br>
![Library](https://github.com/maywoollcott/librislog/blob/main/screenshots/current.PNG)
**Currently Reading**
<br>
View your currently-reading bookshelf here. Click on a spine to expand details about the selected book and see your reading progress (pages read and pages left to go, number of reading sessions, and total minutes read). Click "Log Progress" to update your place in the book, or "Start Session" to start a timed reading session, which will be analyzed and added to your stats.
<br>
<br>
![ReadingSession](https://github.com/maywoollcott/librislog/blob/main/screenshots/session.PNG)
**Reading Session**
<br>
Once you start a reading session, your session start-time will be displayed. Click "End Session" and you will be prompted to enter the page you've reached, or "Finished Book" if you've completed the book. 
<br>
<br>
![OverallStats](https://github.com/maywoollcott/librislog/blob/main/screenshots/stats.PNG)
**Overall Stats**
<br>
The stats page contains the following data, gleaned from all of your reading sessions:
*Books Finished<br>
*Reading Sessions<br>
*Average Session Length<br>
*Minutes Read<br>
*Pages Read<br>
*Average Reading Pace<br>
*Current Streak<br>
*Longest Reading Session<br>
<br>
<br>
![TechStack](https://github.com/maywoollcott/librislog/blob/main/screenshots/techstack.PNG)
**Tech Stack**
<br>
<br>
**How to Run Libris Log Locally**
1. Clone this repo.
2. Run 'npm i' in both the client folder and the backend folder.
3. In the backend folder create a file named '.env', and use 'envexample' as a guide to enter your own information. Do the same in the client folder.
4. Start the server by running 'node start'.
5. Start the client by running 'npm start'. 
6. Open 'http://localhost:3000' in your preferred browser.
7. Ta-da!
