This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## 1. Links
- If a href is of type `http://[ro|en]/internal_subpath/...` then we will use the **en** or **ro** for the language and the rest 
of the panthname as a subpath to the `/` home path.
  * Ex of internal links: `http://en/projects/project-1` or `http://ro/proiecte/proiectul-doi`
  * Ex of external links: `http://www.google.com` or `http://www.facebook.com`
> ⚠️  Any link that dose not start with `http://[ro|en]` will be treated as an extenal link.