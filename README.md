# Shopify event manager

This project is a full-stack web application with:

- **Backend:** Node.js + Express
- **Frontend:** React (Vite)
- **Database:** PostgreSQL
- **Email Service:** Ethereal (for testing)
- **Containerization:** Docker + Docker Compose

---

📝 **Project Description**

This project is composed by a postgres database with 3 tables used to store the information about emails that have been sent, the emails template and the events that represent events from Shopify.
- emails
- templates
- events

The API, built with Node.js+Express, manipulates the data in the database by providing the following endpoints (http://localhost:3000/api):

- Webhook
    - (POST) /webhooks/add-webhook -> Mock a call to the Shopify API to subscribe to a event topic
- Emails
    - (POST) /email/orders-paid -> Endpoint to simulate the Shopify call whenever an order/paid event occurs and trigger an email, using Ethereal to mock an SMTP, to the user that paid an order. When we simulate this event, the response will return an url that allows the caller to see the email that was sent (mock).
    - (GET) /email/list-emails -> Endpoint to list all emails sent
- Templates
    - (GET) /template/list-templates -> list all templates
    - (POST) /template/insert-template -> insert a new template for an event
    - (PUT) /template/update-template -> updates the template for an event
    - (DELETE) /template/delete-template -> deletes the template for an event

And finally, we can manage this data from a dashboard built with React+Vite, this app allows the user to see all the sent emails and to list, update and insert new templates.

---

🛠️ **Project setup**

The project setup to actually start everything is quite straightforward as it's using docker so everything runs inside 3 containers, for the db, node.js and react. So it is only required to run a command to start the containers.

Execute the following code to start the docker containers.

`docker-compose up --build`

If we need to delete the volumes of the containers, for cleaning the database for example we should execute:

`docker-compose down -v`
