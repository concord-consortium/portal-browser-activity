---
---
# Publish the activity to the portal

1. Install the Chrome app [Postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)
2. log into the portal http://localhost:3000
3. POST the contents of the file `activity_description.json`
4. to the portal route

        http://localhost:3000/external_activities/publish/v2

## Notes
There are two versions of postman, the newest version 0.9 that runs outside the browser as a chrome package app. And version 0.8 that runs in the browser as a privileged tab.
You want 0.8 so you can log into the portal normally and then post to it with the same cookies from when you logged in.

The publishing proces could be improved by adding CORS support to publishing parts of the portal, so if you are logged in as an admin on the portal then any web site can publish activities to the portal. It would be good to add a secret token to this, so it wouldn't be vunerable to CSRF

# Run the activity from the portal and have it send results

1. start the activity server, it uses the gh-pages server jekyll

        bundle install
        jekyll serve --watch

2. run the 'Cool Activity' published in the section above
3. click Send Learner Data

## Notes
The browser page is parsing the url that opens the activity to find the return url.
The activity should be opened with a url something like this:

    activities.com/activity/1/sessions/?domain=http://www.example.com/&externalId=999&returnUrl=http://www.example.com/dataservice/external_activity_data/888

The format of the data sent to the portal from the activity should look like this:

    [
       { "type": "open_response",
         "question_id": "1234567",
         "answer": "I like this activity"
       },
       { "type": "multiple_choice",
         "question_id": "456789",
         "answer_ids": ["98"],
         "answer_texts": ["blue"]
       },
       { "type": "image_question",
         "question_id": "1970",
         "answer": "This is my image question answer",
         "image_url": "imageshack.com/images/1.png"
       }
     ]

Without changing the portal code a post to the returnUrl will go through but the browser will throw an error afterwards.
There is a branch in the portal `wip-browser-activity`, which adds the CORS support to remove this error.
