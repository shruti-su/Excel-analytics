import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext"; // Adjust the import path as necessary
import AuthService from "../../services/api/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { signInWithPopup, auth, provider } from "@/firebase";


export function SignUp() {
  const { login } = useAuth(); // Destructure the login function from useAuth
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("Logged in user:", user);
      const response = await AuthService.googleLogin({
        email: user.email,
        name: user.displayName,
      });
        login(response.token);
        navigate("/dashboard/home");
  
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignUp = async (event) => {
    
    event.preventDefault();
    setError("");
    setSuccess("");
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      const response = await AuthService.signUpUser({ name, email, password });
      if (response.error || response.warning) {
        // console.error("Signup error:", response);
        setError(response.error || response.warning || "Signup failed");
      } else {
        setSuccess("Registration successful! Please sign in.");
        // setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
        // console.log("User registered successfully:", response);
        login(response.token); // Call the login function from AuthContext to update global state
        navigate("/dashboard/home"); // Redirect to the dashboard after successful registration
        
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="flex m-7">
            <div className="hidden w-2/5 h-full lg:block">
        <img
          src="/img/907931.jpg"
          className="object-cover w-full h-full rounded-3xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="mb-4 font-bold">Join Us Today</Typography>
        </div>
        <form className="max-w-screen-lg mx-auto mt-8 mb-2 w-80 lg:w-1/2" onSubmit={handleSignUp}>
          <div className="flex flex-col gap-6 mb-1">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your Name
            </Typography>
            <Input
              size="sm"
              placeholder="Your Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="sm"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="sm"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="sm"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* Show error or success message */}
          {error && (
            <Typography variant="small" color="red" className="mb-4 text-center">
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="small" color="green" className="mb-4 text-center">
              {success}
            </Typography>
          )}
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black underline transition-colors hover:text-gray-900"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit">
            Register Now
          </Button>

          <div className="mt-8 space-y-4">
            <Button size="lg" color="white" className="flex items-center justify-center gap-2 shadow-md" fullWidth onClick={loginWithGoogle}>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
          </div>
          <Typography variant="paragraph" className="mt-4 font-medium text-center text-blue-gray-500">
            Already have an account?
            <Link to="/auth/sign-in" className="ml-1 text-gray-900">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
