import SignInPage from "views/SignInPage/SignInPage";
import SignUpPage from "views/SignUpPage/SignUpPage";
import NotFoundPage from "views/NotFoundPage/NotFoundPage";

var indexRoutes = [
  { path: "/signin", name: "SignInPage", component: SignInPage },
  { path: "/signup", name: "SignUpPage", component: SignUpPage },
  { path: "*", name: "NotFoundPage", component: NotFoundPage }
];

export default indexRoutes;
