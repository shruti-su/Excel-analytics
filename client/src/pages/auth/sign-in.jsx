import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth } from "@/components/auth/AuthContext"; // Adjust the import path as necessary
import AuthService from "@/services/api/auth"; // Import the AuthService for API calls
import { signInWithPopup, auth, provider } from "@/firebase";

export function SignIn() {
   const { login } = useAuth(); // Destructure the login function from useAuth
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for displaying error messages

  // Function to handle the sign-in process
  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear any previous errors

    // Basic client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
    
      const response = await AuthService.loginUser({ email, password });

      // Check simulated credentials
      if (response.msg === 'Logged in successfully!') {
        login(response.token); // Call the login function from AuthContext to update global state
        navigate("/dashboard/home"); // Redirect to the dashboard after successful login
      } else {
        // If simulated credentials don't match, set an error
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      // Catch any network errors or issues with the API call
      setError(
    err.response?.data?.msg ||
    err.response?.data?.error ||
    "An error occurred during sign-in. Please try again."
  );
      console.error(err);
    }
  };
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

  return (
    <section className="flex gap-4 m-8">
      <div className="w-full mt-24 lg:w-3/5">
        <div className="text-center">
          <Typography variant="h2" className="mb-4 font-bold">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="w-full max-w-screen-lg mx-auto mt-8 mb-2 sm:w-4/5 lg:w-1/2" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-6 mb-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="****"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Display error message if any */}
          {error && (
            <Typography variant="small" color="red" className="mb-4 text-center">
              {error}
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
                  className="font-normal text-blue-600 underline transition-colors hover:text-blue-800"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6 bg-blue-500 hover:bg-blue-600" fullWidth type="submit">
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Subscribe me to newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Forgot Password
              </a>
            </Typography>
          </div>
          <div className="mt-8 space-y-4">
            <Button size="lg" color="white" className="flex items-center justify-center gap-2 shadow-md hover:shadow-lg" fullWidth onClick={loginWithGoogle}>
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
            Not registered?
            <Link to="/auth/sign-up" className="ml-1 text-blue-600 hover:text-blue-800">Create account</Link>
          </Typography>
        </form>
      </div>
      <div className="hidden w-2/5 h-full lg:block">
        <img
          src="/img/907931.jpg"
          className="object-cover w-full h-full rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;