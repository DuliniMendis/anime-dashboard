# AniRealm

This is a simple list and details pages app made with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using [Next.js](https://nextjs.org/) version 14.

I learnt a bunch of new NextJs features while doing this so I'm happy about the time I spent on it. It was definitely more than 2 hours 😀.

ChatGPT helped a bit too. I'd be alarmed if someone doesn't use it for dev work these days. 

## Getting Started

The setup is a tiny bit complicated than it needs to be, just because I used a database. You can use my database if you have the secrets that I have sent you. Otherwise, you will need a simple database with a table called `anime_users` with 3 columns:
1. An `id` column which is the primary key
2. A `username` column which is unique, text and not null
3. A `job_title` column which is also text and not null

- Clone the repository in you local environment. 
- You might need to change you node version to v20.16.0. You can use [nvm](https://github.com/nvm-sh/nvm) to keep multiple node versions and switch between them.
- Copy the `.example-env` file as `.env` and add the `AUTH_SECRET`.
- Copy the `.example-env.local` file as `.env.local` and add the `POSTGRES_PASSWORD`.
- You can use any of the popular package managers to install dependencies and run the development server.
```
npm install
npm run dev
```
or 
```
yarn install
yarn dev
```
or
```
pnpm install
pnpm dev
```

To run tests:

```bash
npm test
```
or 
```
yarn test
```
or 
```
pnpm test
```

## See it live!

You can see the deployed version [here](https://anime-dashboard-blond.vercel.app/).
Hopefully I haven't broken it while trying to improve it 😅

## The development process

I've been using NextJS 13 with the pages router and client-side pages in my current job so it was a learning experience to use server side rendering. It's not a fully polished production app but I tried to incorporate some additional features that were not in the design brief. They are outlined below.

### **GraphQL**

- I setup `graphql-codegen` to generate types with the co-location plugin to prevent types from the two queries I was using from conflicting with each other.

### **Forms**

- The forms don't have error messages coming back from the server if the form action failed. If I had more time, I would've added those.
- Once the edit details form action is successful, it would've been nice if there was some sort of success message like a toast, which isn't there right now. 

### **Loading**

- I added skeleton loading states and spinners to some parts of the app but there are more places that can benefit from them like the Logout, the Avatar and the username check on the Login and Edit Details forms.
- There are some flickers and fonts/colors changing after a second or so. If I had time, I would've troubleshooted what was causing those.

### **Modal and interception**

- I made the modal with anime details show up by using route interception. It could've been done in a simple modal but I thought I'd try the parallel route concept just to add some (maybe unnecessary) complexity.

### **Styles**

- I extended the theme in `Chakra UI` a bit and used some Google fonts.
- This was the first time I used `Chakra UI` but it was pretty easy to use.

### **Authentication**

- I used `next-auth` to block routes until users logged in using a middleware pattern.
- I also added a `Postgres` database that stores the user data. 
- 'Next-auth' was so confusing to setup but I think I got it working.
- When you log in, a session is created with the `userId` saved in the session. 
- A `UserContext` reads the `userId` from the session and fetches the full user from the DB using server actions. 
- When user details are edited, the `UserContext` is updated as well.
- The login and edit details forms show an error if you try to use a username that is already used with a jobTitle that doesn't match the existing username. Since this  is a made-up scenario and users won't be using usernames and job titles to log in, I thought it was fine to show this error. I wouldn't do this if passwords were involved since you can find passwords of other users with this security loophole.

### **Testing**

- I configured `jest` and `React Testing Library` and wrote a few unit tests. Obviously they are just examples and not comprehensive at all.
- There are no E2E tests but that would be something I'd have in a typical CI/CD pipeline. Linting and formatting checks would also go in that pipeline if one existed.
- I would've used `faker-js` for mocking values for tests but I didn't do it in this app since it might be overkill.

### **Formatting**

- I added `Prettier` for making formatting consistent.
- I would've added an import sorting package as well if I had time.