import React from "react";
import SignInPage from "views/SignInPage/SignInPage";
import SignUpPage from "views/SignUpPage/SignUpPage";

var indexRoutes = [
  { path: "/signin", name: "SignInPage", component: SignInPage },
  { path: "/signup", name: "SignUpPage", component: SignUpPage }
];

export default indexRoutes;
