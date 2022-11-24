import AuthForm from "./components/auth-form.js";
import Layout from "./components/layout.js";

const app = async () => {
  new Layout();
  new AuthForm();
};

document.addEventListener("DOMContentLoaded", app);
