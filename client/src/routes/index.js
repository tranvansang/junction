import LandingPage from "views/LandingPage/LandingPage";
import SignInPage from "views/SignInPage/SignInPage";
import SignUpPage from "views/SignUpPage/SignUpPage";
import HomePage from "views/HomePage/HomePage";
import ChatterPage from "views/ChatterPage/ChatterPage";
import ConversationPage from "views/ConversationPage/ConversationPage";
import OwnerPage from "views/OwnerPage/OwnerPage";
import BotPage from "views/BotPage/BotPage";
import NotFoundPage from "views/NotFoundPage/NotFoundPage";
import ForgotPasswordPage from "views/ForgotPasswordPage/ForgotPasswordPage";

var indexRoutes = [
  { path: "*", name: "NotFoundPage", component: NotFoundPage },
  { path: "/", name: "LandingPage", component: LandingPage },
  { path: "/test", name: "LandingPage", component: LandingPage },
  { path: "/signin", name: "SignInPage", component: SignInPage },
  { path: "/signup", name: "SignUpPage", component: SignUpPage },
  {
    path: "/forgotpassword",
    name: "ForgotPasswordPage",
    component: ForgotPasswordPage
  },
  {
    path: "/home/:user_id",
    name: "HomePage",
    component: HomePage
  },
  {
    path: "/chatter/:chatter_id",
    name: "ChatterPage",
    component: ChatterPage
  },
  {
    path: "/chatter/:chatter_id/conversation/:conversation_id",
    name: "ConversationPage",
    component: ConversationPage
  },
  {
    path: "/owner/:owner_id",
    name: "OwnerPage",
    component: OwnerPage
  },
  {
    path: "/owner/:owner_id/bot/:bot_id",
    name: "BotPage",
    component: BotPage
  }
];

export default indexRoutes;
