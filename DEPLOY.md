Here is the raw Markdown code for your summary. You can copy and paste this directly into a `README.md` file or any documentation manager:

```markdown
# Grace & Gorgeous — Ecosystem & Deployment Summary

This document serves as the master reference blueprint for the **Grace & Gorgeous** luxury bridal rental platform, detailing server paths, domain mappings, and content operations.

---

## 🌐 1. Live Deployment Architecture

The platform runs on a modern decoupled architecture, combining high-performance computing with a serverless content lake.


```

[ Customer Browser ]                 [ Admin Browser ]
│                                   │
▼ (HTTPS)                           ▼ (HTTPS)
┌───────────────────────┐           ┌───────────────────────────────┐
│   React Frontend App  │           │   Sanity Studio Dashboard     │
│  (AWS EC2 Production) │           │   (Sanity Cloud Hosting)      │
└───────────┬───────────┘           └───────────────┬───────────────┘
│                                       │
│ (Pulls Content via GROQ)              │ (Pushes Mutations)
└───────────────► ┌───────────┐ ◄───────┘
│  Sanity   │
│  Content  │
│   Lake    │
└───────────┘

```

---

## 🛠️ 2. Server & Environment Blueprint

### Frontend Hosting (AWS EC2)
* **Server Root Directory:** `/var/www/grace-n-gorgeous/grace-rental-couture-main`
* **Production Domain:** `https://gracegorgeous.in` & `https://www.gracegorgeous.in`
* **Frontend Tech Stack:** React, TanStack Router/Query, Tailwind CSS

### Content Engine (Sanity CMS)
* **Project Name:** `gracengorgeous`
* **Project ID:** `tg7pzdn2`
* **Dataset:** `production`
* **Organization ID:** `om0eOaRWy`
* **Deployment Application ID (`appId`):** `ja87om2bzh7x28l681awkrtl`

---

## ✍️ 3. Sanity Blog Content Management (CRUD)

All blog administration is completely shifted away from the terminal and is handled via a secure, visual web workspace.

### 🔗 Live Admin Control Panel
👉 **[https://gracegorgeous-admin.sanity.studio](https://gracegorgeous-admin.sanity.studio)** *(Log in using your verified developer email credentials)*

### 🔄 The Content Lifecycle (CRUD Operations)

| Operation | Action in Admin Studio | Tech Behavior Under the Hood |
| :--- | :--- | :--- |
| **CREATE** | Click **Post** ➔ **Create New (+)** ➔ Fill out content ➔ Click **Publish**. | Generates a new unique `_id` document inside the Sanity cloud dataset. |
| **READ** | Visit `https://gracegorgeous.in/blog`. | Frontend queries the live dataset using **GROQ** to seamlessly stream text and media. |
| **UPDATE** | Open any published post, edit fields, and click **Publish** again. | Issues a secure `patch` command to overwrite the content lake across all users instantly. |
| **DELETE** | Open a post, click the options arrow next to "Publish" ➔ Choose **Delete**. | Completely purges the document entry from your active production dataset. |

---

## 🛡️ 4. Active Security & Access Rules (CORS)

To allow secure data transmission between your cloud database and your visitors, your Sanity API dashboard has been locked down to accept traffic **only** from these whitelisted locations:

* **Production:** `https://gracegorgeous.in` *(Credentials Allowed)*
* **Production Subdomain:** `https://www.gracegorgeous.in` *(Credentials Allowed)*
* **Local Development:** `http://localhost:8080` & `http://localhost:3333`

---

## 🚀 5. Quick Terminal Cheatsheet (For Future Updates)

If you ever make structural code modifications to your schemas on your laptop and need to push them up to your live workspace, use these quick commands inside your local workspace directory (`C:\...\studio-gracengorgeous`):

```bash
:: Clear out old cache files if Windows locks files up again
rmdir /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps

:: Deploy layout upgrades directly to your active URL link
npx sanity deploy

```

```

```