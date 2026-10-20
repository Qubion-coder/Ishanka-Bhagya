# Connect RSVPs to Google Sheets

RSVPs from the website are saved to this sheet:
https://docs.google.com/spreadsheets/d/1kNJgVhyMlTtn5jHsnqIRolKF1qJn-OItq6Q7PINnBIw/edit

Each RSVP becomes one row in the **RSVP** tab with these columns:

| Timestamp | Full Name | Attendance | Seats | Message for the Couple | Invited As | Invitation Link |
|---|---|---|---|---|---|---|

## 1. Add the script

1. Open the Google Sheet above (signed in as its owner).
2. Click **Extensions → Apps Script**.
3. Delete everything in `Code.gs` and paste the full contents of `google-apps-script/code.gs`.
4. Click **Save** (💾).

## 2. Create the RSVP tab with headers

1. In the toolbar function dropdown, choose **setupSheet**, then click **Run**.
2. The first time, Google asks for permission: **Review permissions → choose your account → Advanced → Go to project (unsafe) → Allow**. ("Unsafe" only means Google hasn't reviewed your own script.)
3. Go back to the sheet: an **RSVP** tab now exists with rose gold headers.

## 3. Publish it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
4. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. To check it works, open that URL in a browser. It should say `"Ishanka & Bhagya RSVP endpoint is running."`

## 4. Connect the website

Paste the URL into `src/config/wedding.ts`:

```ts
export const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXX/exec';
```

Then commit and push. Until this is set, the RSVP form tells guests that it isn't connected yet instead of sending their answers anywhere.

## Changing the script later

After editing `code.gs`, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. This keeps the same URL, so the website needs no change.
