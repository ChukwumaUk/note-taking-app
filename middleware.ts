import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // redirect if not logged in
  },
});

export const config = {
  matcher: ["/dashboard"],
};