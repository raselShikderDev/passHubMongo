/* eslint-disable react/prop-types */
import { MdContentCopy, MdDeleteForever } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const PasswordList = ({ arryPasss, removeItem, EditItem, copyText }) => {
  const [showPassText, setShowPassText] = useState({})

  const togglePassShowBtn = (id) => {
    setShowPassText((prev) => ({
      ...prev, [id]: !prev[id]
    }))
  }

  return (
    <section className="pt-10 w-full sm:w-[96%] mx-auto">
      
      <div className=" font-sans">
        <div className="w-[90%] sm:w-[90%] mx-auto space-y-3">
          <h2 className="text-3xl font-semibold font-sans">Your Passwords</h2>
          <table className="table-fixed space-y-3 w-full ">
            <thead className="mb-2">
              <tr className="bg-green-300">
                <th className="bg-green-300 border border-white">Website</th>
                <th className="bg-green-300 border border-white">Username</th>
                <th className="bg-green-300 border border-white">Password</th>
                <th className="bg-green-300 border border-white">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-3">
              {arryPasss.map((item) => {
                // console.log(item);
                const { websiteURL, username, password, _id } = item;
                if (websiteURL || username || password) {
                  return (
                  <tr key={_id} className="">
                    <td className="bg-green-100 border border-white py-1 px-2">
                      <div className="flex justify-between items-center">
                        <a
                          href={websiteURL}
                          className="overflow-x-scroll web-cell"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {websiteURL}
                        </a>{" "}
                        <button
                          className="cursor-pointer group"
                          onClick={() => copyText(item.websiteURL)}
                        >
                          <MdContentCopy className="group-active:scale-110" />
                        </button>
                      </div>
                    </td>
                    <td className="bg-green-100 border border-white py-2 px-2">
                      <div className="flex justify-between items-center">
                        <p className="overflow-x-scroll web-cell">{username}</p>{" "}
                        <button
                          className="cursor-pointer group"
                          onClick={() => copyText(item.username)}
                        >
                          <MdContentCopy className="group-active:scale-110" />
                        </button>
                      </div>
                    </td>
                    <td className="bg-green-100 border border-white py-2 px-2">
                      <div className="flex justify-between items-center">
                        <p className="overflow-x-scroll web-cell">{showPassText[_id] ? password: "*".repeat(password.length)}</p>
                          <div className="space-x-3">
                            <button
                          className="cursor-pointer group"
                          onClick={()=> togglePassShowBtn(item._id)}
                        >
                          {showPassText[_id] ? <FaEye className="text-gray-600 text-sm group-active:scale-110" /> : <FaEyeSlash className="text-gray-600 text-sm group-active:scale-110" />}
                        </button>
                            <button
                          className="cursor-pointer group"
                          onClick={() => copyText(item.password)}
                        >
                          <MdContentCopy className="group-active:scale-110" />
                        </button>
                        </div>
                      </div>
                    </td>
                    <td className="bg-green-100 border text-center  border-white py-2 px-2">
                      <button onClick={()=> EditItem(_id)} className="text-green-500 active:scale-110 hover:text-green-400 font-bold  text-sm px-3 rounded">
                        <FaRegEdit className="text-lg" />
                      </button>
                      <button onClick={()=> removeItem(_id)} className="text-red-500 active:scale-110 hover:text-red-400 font-bold  text-sm px-3 rounded">
                        <MdDeleteForever className="text-lg" />
                      </button>
                    </td>
                  </tr>
                );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PasswordList;