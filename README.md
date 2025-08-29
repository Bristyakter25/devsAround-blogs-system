
# DevsAround Blog Website

## Project Introduction
This is a **dynamic blog platform** built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**. Users can read blogs, create posts, search by tags, and manage their own blogs.  

**Live Site:** [DevsAround Blog Website](https://react-auth-private-route-c0a3a.web.app/)


**Screenshots/GIF:**  
![Home Page](./screenshots/home.png)  
![Blog Detail](./screenshots/blog-detail.png)  

---

## Tech Choices
- **Frontend:** React.js  
- **Backend:** Node.js + Express.js (REST APIs)  
- **Database:** MongoDB (Atlas or local)  
- **Authentication:** Firebase  
- **Editor:** React + TipTap
- **Styling:** Tailwind CSS + DaisyUI + Framer Motion  

**Why these choices:**  
- React.js for a fast, component-based frontend with dynamic UI updates.  
- MongoDB for a flexible document-based schema that easily handles blog data.  
- Firebase Authentication for secure and easy-to-integrate user authentication without managing JWTs.  
- Tailwind CSS + DaisyUI for rapid, responsive, and attractive UI development.  

---

### Install Dependencies
```bash
#  npm install

### Environment Variables

Frontend (frontend/.env.example):

VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=

Backend (backend/.env.example):

DB_USER=
DB_PASS=

### Run Development

```bash
 npm run dev
```


## Useful URLs

**Live Site:** [DevsAround Blog Website]()

**API Docs:**  [Server](https://blog-site-server-gamma.vercel.app/)


---


**Service Ports:**

* Web: 5173
* API: 5000

---

## Known Issues & Tradeoffs

* Some features are client-side only; SSR not implemented everywhere.
* No rate limiting on APIs (for simplicity).
* File uploads limited to certain size and types.

````


