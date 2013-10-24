---
---

# Publish the activity to the portal

1. Install the Chrome app postman:
https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm
Note there are 2 versions of postman, the newest version 0.9 that runs outside the browser as a chrome package app. And version 0.8 that runs in the browser as a privileged tab.
You want 0.8 so you can log into the portal normally and then post to it.
https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop
2. log into the portal http://localhost:3000
3. POST the file `activity_description.json`
4. to the portal route

        http://localhost:3000/external_activities/publish/v2

Note this can be improved by adding CORS support to the portal, so if you are logged in as an admin on the portal then any web site can publish activities to the portal. It would nice to restrict this some how to authorized domains though just to prevent any random site from doing this.

You might also be able to load the postman-collection.json file into postman which is pre-populated with the json and address.

# Run the activity from the portal and have it send results

1. start the activity server
To run this locally it is best for it to be running in a server. So it uses the gh pages server XXX 
(I should make a different set of directions so this can be run from the github.io)

        bundle install
        jekyll serve --watch

2. run the 'Cool Activity' published in the section above


TODO
browser page needs to parse the url that looks like this:

    activities.com/activity/1/sessions/?domain=http://www.example.com/&externalId=999&returnUrl=http://www.example.com/dataservice/external_activity_data/888

to get the returnUrl
so that as the student is running it then data can be sent to that URL that looks like this:

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

Inorder to do that the rails app needs to support CORS on the post to that URL
$.post('http://machineA:8081', {file_url: 'asfd'}, function(d){console.log(d)})
need to inspect the headers sent by jquery with the post we might need to add them to
CORS for example:
Access-Control-Allow-Headers: x-requested-with


