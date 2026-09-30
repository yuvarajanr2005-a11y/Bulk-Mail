# Vercel Deployment

Deploy the backend and frontend as separate Vercel projects from `yuvarajanr2005-a11y/Bulk-Mail`, branch `main`.

## Backend

Create a Vercel project for the GitHub repository and set its Root Directory to `BULKMAIL-BACKEND`. Add these environment variables in Vercel:

- `GMAIL_USER`: the Gmail account used to send messages
- `GMAIL_APP_PASSWORD`: a Google app password for that account
- `FRONTEND_URL`: the deployed frontend origin, for example `https://your-frontend.vercel.app`

Deploy the backend and copy its Vercel URL. The API endpoint is `/sendemail`.

## Frontend

Create a second Vercel project for the same GitHub repository and set its Root Directory to `BULKMAIL-FRONTEND`. Set this environment variable before deploying:

- `REACT_APP_API_URL`: the deployed backend origin, for example `https://your-backend.vercel.app`

Vercel builds the React app into `build`. Redeploy after changing environment variables.

## Local mail configuration

Copy `BULKMAIL-BACKEND/.env.example` to `BULKMAIL-BACKEND/.env` and fill in the mail settings for local development. The `.env` file is ignored by Git.

The Gmail app password previously present in source has been removed. Revoke it and create a replacement before deploying; removing a credential from the latest commit does not remove it from earlier Git history.