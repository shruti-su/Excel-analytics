import { useState } from "react";
import "./index.css";
import userService from "./services/userService";
import Attendence from "./pages/attendence";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
async function getUser() {
  const data = await userService.getAllUsers();
  console.log(data);
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  getUser(); // Fetch user data when the component mounts

  return (
    
    <Attendence />
  );
}

export default App;
