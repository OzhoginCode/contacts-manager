import axios from "axios";

const renderHomePage = (state) => {
  const signInButton = document.querySelector("#exampleModalToggleLabel");
  signInButton.textContent = state.currentUser;
};

const addNewUser = async (newUser) => {
  try {
    const response = await axios.post("/api/users/", newUser);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (user) => {
  try {
    const response = await axios.post("api/sessions/", user);
    alert("hello");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getCurrentUser = async (state) => {
  try {
    const response = await axios.get("/api/users/current/", { isGuest: true });
    console.log(response.data);
    const userEmail = response.data.email;
    state.currentUser = userEmail;
  } catch (err) {
    console.log(err);
  }
};

const app = () => {
  const state = {
    loginUserForm: {
      email: "",
      password: "",
    },
    createUserForm: {
      email: "",
      password: "",
    },
    currentUser: "",
  };
  const elements = {
    loginUserForm: document.querySelector("#loginUserForm"),
    createUserForm: document.getElementById("createUserForm"),
    signInButton: document.querySelector("#exampleModalToggleLabel"),
  };
  // elements.signInButton.textContent = 'Hello'
  const loginUserHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log(e.target)
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    state.loginUserForm.email = email;
    state.loginUserForm.password = password;
    loginUser({ login: email, password: password });
    getCurrentUser(state);
    renderHomePage(state);
    form.reset();
  };

  const createUserHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeat_password = formData.get("repeat_password");
    if (password === repeat_password) {
      state.createUserForm.email = email;
      state.createUserForm.password = password;
    }
    addNewUser({ login: email, password: password });
    form.reset();
  };

  elements.createUserForm.addEventListener("submit", (e) =>
    createUserHandler(e)
  );
  elements.loginUserForm.addEventListener("submit", (e) => loginUserHandler(e));
};

export { app };
