import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineDataSaverOn } from "react-icons/md";
// import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import PasswordList from "./PasswordList";

const Hero = () => {
  const [showPass, setShowPass] = useState(true);
  const [arryPasss, setArryPasss] = useState([]);
  const [showBtnText, setShowBtnText] = useState(true);
  const [formValue, setFormValue] = useState({
    websiteURL: "",
    username: "",
    password: "",
    id: ""
  });
  // Getting Passsword by Get request from MongoDb server

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    if (!req.ok) {
      throw new Error(`HTTP error! status: ${req.status}`);
    }
    try {
      let password = await req.json();
      console.log(password);

      if (password) {
        setArryPasss(password);
      }
    } catch (error) {
      console.error(`Data fetching faild: ${error}`);
      setArryPasss([]);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Handling Password show and hide button
  const handlePassShowBtn = () => {
    setShowPass((prev) => !prev);
  };

  // Handling Input values
  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  // Handling From Submit Button
  const handleFormSubmitBtn = async (e) => {
    e.preventDefault();
    if (!showBtnText) {
      toast("Succesfully Updated ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setShowBtnText(true);
    } else {
      toast("Added Succesfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // if such id match then delete _ for updateing array after edit action
    if (!showBtnText || formValue.id) {
      try {
      let res = await fetch(`http://localhost:3000/passwords/${formValue.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let data = await res.json();
      if (Array.isArray(data)) {
        // Ensure response is an array
        setArryPasss(data);
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Invalid server response");
      }
    } catch (error) {
      console.error(`Failed to remove item: ${error}`);
    }
    } else {
      console.error(`faild to Old Data : ${formValue.id}`)
    }


    let res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValue),
    });
    let data = await res.json();
    setArryPasss((prev) => {
      const updatedPasswords = [...prev, data];
      return updatedPasswords;
    });
    getPasswords();
    setFormValue({
      websiteURL: "",
      username: "",
      password: "",
    });
  };

  // Handling Delete Button
  const removeItem = async (id) => {
    toast("One Item removed", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    try {
      let res = await fetch(`http://localhost:3000/passwords/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let data = await res.json();
      if (Array.isArray(data)) {
        // Ensure response is an array
        setArryPasss(data);
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Invalid server response");
      }
    } catch (error) {
      console.error(`Failed to remove item: ${error}`);
    }
  };

  // Handling Edit Button
  const EditItem = (id) => {
    setShowBtnText(false);
    if (showBtnText) {
      toast("Editing One Item", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const itemToEdit = arryPasss.find((item) => item._id === id);
    if (itemToEdit) {
      setFormValue({
        websiteURL: itemToEdit.websiteURL || "",
        username: itemToEdit.username || "",
        password: itemToEdit.password || "",
        id: itemToEdit._id || "",
      });
      setArryPasss((prev) => prev.filter((item) => item._id !== id))
    } else {
      console.error(`${id} not found for delete`);
    }
  }
    

  // Handling Copy Button
  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(() => {
        toast.error("Failed to copy", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <section className="font-mono py-10 pt-20">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="container w-full ">
        <div className=" w-full sm:w-2/3 mx-auto">
          <h2 className="text-center hidden sm:block">
            <a href="#">
              <Logo />
            </a>
          </h2>
          <p className="text-base sm:text-lg text-center font-mono leading-tight">
            Most Advanced & Secured Password Manager
          </p>
          <div className="mt-4 sm:mt-10 w-full">
            <form
              onSubmit={handleFormSubmitBtn}
              className="flex container flex-col justify-center items-center gap-3 w-[90%] sm:w-full"
            >
              <div className="w-[90%] sm:w-full grid grid-cols-1">
                <input
                  type="text"
                  name="websiteURL"
                  onChange={handleInput}
                  value={formValue.websiteURL}
                  placeholder="Enter Your Website URL"
                  className="rounded-full pl-2 py-0.5 outline-none border-[1px] w-full border-[#67c656]"
                />
              </div>
              <div className="w-[90%] sm:w-full relative flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center">
                <input
                  type="text"
                  name="username"
                  onChange={handleInput}
                  value={formValue.username}
                  placeholder="Enter Username"
                  className="rounded-full pl-2 py-0.5 outline-none border-[1px] w-full sm:w-[60%] border-[#67c656]"
                />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  onChange={handleInput}
                  value={formValue.password}
                  placeholder="Enter Password"
                  className="rounded-full pl-2 py-0.5 outline-none border-[1px] w-full sm:w-[37%] border-[#67c656]"
                />
                <div className="absolute right-2 lg:right-3 transform translate-y-[47px] sm:translate-y-0.5 ">
                  <button type="button" onClick={handlePassShowBtn}>
                    {showPass ? (
                      <FaEyeSlash className="text-gray-700" />
                    ) : (
                      <FaEye className="text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={
                    !formValue.websiteURL ||
                    !formValue.username ||
                    !formValue.password
                  }
                  className="font-bold hover:scale-105 hover:bg-green-500 bg-green-400 px-6 py-1 rounded-full border-[0.5px] border-black flex gap-2 items-center"
                >
                  <MdOutlineDataSaverOn />
                  {showBtnText ? "Add" : "Edit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PasswordList
        arryPasss={arryPasss}
        EditItem={EditItem}
        removeItem={removeItem}
        copyText={copyText}
      />
    </section>
  );
};

export default Hero;
