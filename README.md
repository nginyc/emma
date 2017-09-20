# Emma - Eureka Moments Meeting Assistant

This is built during a 1-night hackathon TechCrunch Disrupt SF 2017. Our submission page is available @ https://devpost.com/software/emma-m0d7oq.

Our idea was a smart meeting assistant powered by Nexmo's Voice APIs. Users would go to a page to schedule a meeting by simply typing desired meeting participants' phone numbers and the date & time to scheudule the meeting. At the time specified, a joint voice conference would be initiated to each phone number. During the meeting, whenever an important idea or point is made, users would say "EMMA, (idea/point)" and what is spoken would be transcribed in real-time on a Google Doc automatically created for that meeting. When all users exit the voice conference at the end of the meeting, the Google Doc would be saved to everyone's Google Drive as a transcript for that meeting.

In the short amount of time we had, we created an Express app that:
  - Served the meeting creation page
  - Made calls to Nexmo's Voice APIs to initiate a multi-user voice conference when user creates a meeting
  - Served webhooks that responded with the appropriate Nexmo NCCOs
  - Made calls Google Drive APIs after the conference ends to create a new Google Doc in a user's Google Drive

We tried (but failed) to integrate a Websocket-supported Amazon Lex chatbot into the Nexmo voice conference. We also faced challenges in getting the recorded audio of a voice conference and trasncribing it with Google Cloud Speech, and did not do so.

This project cannot be run as we removed a number of credentials we had to hardcode in the rush.
