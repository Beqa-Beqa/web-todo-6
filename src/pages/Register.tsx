import { useState } from "react";
import { UserIcon } from "../assets/images";
import { CiImageOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Register = () => {
  // Navigate state for navigating through different routes.
  const navigate = useNavigate();
  // Username state for user input.
  const [username, setUsername] = useState<string>("");
  // Email state for user input.
  const [email, setEmail] = useState<string>("");
  // Password state for user input.
  const [password, setPassword] = useState<string>("");
  // Image state for user input.
  const [image, setImage] = useState<null | File | String>(null);
  // Error state. Used for conditional rendering if error occurs.
  const [err, setErr] = useState<boolean>(false);

  // Handle registration of the user with email and password.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default action of form submit.
    event.preventDefault();

    try {
      // Try and create account for the user with given email and password.
      await createUserWithEmailAndPassword(auth, email, password);
      // If successfull navigate to homepage.
      navigate("/");
      
    } catch (error) {
      // If any errors, catch and log them, set error state to true.
      console.error(error);
      setErr(true);
    }
  }

  return (
    <div id="register" className="d-flex justify-center align-center">
      <div className="form d-flex flex-column align-center">
        <h1>Logo</h1>
        <span>Register</span>
        <form onSubmit={handleSubmit} className="d-flex flex-column align-center w-100">
          <input className="input" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
          <input className="input" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
          <input className="input" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
          <label className="d-flex align-center w-100" htmlFor="fileInput">
            <CiImageOn id="icon" />
            <span>Upload an image</span>
          </label>
          <input id="fileInput" className="d-none" onChange={(e) => {
            const image = e.target.files ? e.target.files[0] : UserIcon;
            setImage(image);
          }} type="file" />
          <button type="submit" className="button-secondary w-100">Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>Already have an account? <Link className="link-button" to="/login">Sign In</Link></p>
      </div>
    </div>
  );
}

export default Register