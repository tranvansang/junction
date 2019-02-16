import SignInPage from "views/SignInPage/SignInPage";
import SignUpPage from "views/SignUpPage/SignUpPage";
import NotFoundPage from "views/NotFoundPage/NotFoundPage";
import ForgotPasswordPage from "views/ForgotPasswordPage/ForgotPasswordPage";

var indexRoutes = [
  { path: "/signin", name: "SignInPage", component: SignInPage },
  { path: "/signup", name: "SignUpPage", component: SignUpPage },
  {
    path: "/forgotpassword",
    name: "ForgotPasswordPage",
    component: ForgotPasswordPage
  },
  { path: "*", name: "NotFoundPage", component: NotFoundPage }
];

export default indexRoutes;
