## Getting Started

1. Create .env.local in the folder, add these three env variables (make sure you got mongodb service running):

MONGODB_URI=mongodb://localhost:27017

NEXTAUTH_SECRET=TsjHs5blRKtv4c/3LBa9YmRnZUt0pbRbZSdwjnvb6CM=

NEXTAUTH_URL=http://localhost:3000/

2. Run `npm run build`
3. Wait for build to finish
4. Run `npm run start`
5. Go to `http://localhost:3000` and login with username: ronbarak, id: 554875621

   This will redirect you to `http://localhost:3000/admin/students`

\*. if database doesn't exist, delete `.next folder`,
and run `npm run dev` and go to `http://localhost:3000/api/seed`

if database collections have only `_id` as an index delete the database and try the above again.
