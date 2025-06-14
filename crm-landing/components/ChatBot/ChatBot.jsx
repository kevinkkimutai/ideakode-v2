"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function ChatBot() {
  const [isOnChat, setIsOnChat] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const boxContainerRef = useRef(null);

  const handleToggleChat = () => {
    setIsOnChat(!isOnChat);
    if (boxContainerRef.current) {
      boxContainerRef.current.classList.toggle("toggle", !isOnChat);
    }
  };

  const submitQuery = () => {
    const anchor = document.createElement("a");
    anchor.href = `https://wa.me/254722214567?text=${enquiry}`;
    anchor.target = "_blank";
    anchor.click();
    handleToggleChat();
  };

  return (
    <div className="">
      <div
  className="fixed bottom-2 group md:bottom-5 right-5 md:right-20 cursor-pointer bg-green-100 text-black rounded-full flex items-center justify-around p-4 max-w-72 z-50"
  onClick={handleToggleChat}
>
  <FaWhatsapp size={25} className="text-[#25d366]" />
  <p
    className="font-medium text-base hidden group-hover:inline  transition-all duration-500 ease-in-out ml-2"
  >
    <span className="font-bold">Hello,</span> How can we help you?
  </p>
</div>

      <div
        onClick={handleToggleChat}
        className="fixed bottom-2 right-2 md:hidden flex items-center justify-center w-20 h-20 p-5 rounded-full cursor-pointer z-15"
      >
        <i className="icofont-whatsapp text-4xl text-white"></i>
      </div>

      <div
        ref={boxContainerRef}
        className={`fixed bottom-20 md:bottom-24 right-0 md:right-5 transition-all duration-500 bg-transparent z-30 w-full md:w-1/2 lg:w-1/4 p-4 rounded-md transform ${
          isOnChat ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleToggleChat}
          >
            <IoClose className="text-2xl text-white hover:text-red-500" />
          </div>
          <div className="p-5 bg-green-600 text-white rounded-t-md">
            <h2 className="font-semibold text-lg">
              Welcome to Netiqa Solutions!
            </h2>
            <p className="font-light text-base">
            We are a leading software company providing hyper-customized web solutions to businesses countrywide. 
            Chat with us on WhatsApp or call directly at +254722214567
            </p>
          </div>
          <div className="p-5 bg-green-200 flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 text-black">
              <div className="flex items-center space-x-2">
                <FaWhatsapp size={40} className="text-[#25d366]" />
                <div>
                  <p className="font-light">Talk to our</p>
                  <h2 className="font-semibold text-lg">Sales Consultants</h2>
                  <p className="font-light">Available 9am to 6pm</p>
                </div>
              </div>
            </div>
            <form className="flex flex-col space-y-2">
              <input
                id="userInput"
                className="p-2 w-full bg-green-100 border border-gray-300 rounded-md"
                placeholder="Send a message to our sales consultant!"
                value={enquiry}
                onChange={(e) => setEnquiry(e.target.value)}
              />
              <button
                className="bg-[#0c0c0c] text-white p-2 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  submitQuery();
                }}
              >
                Send
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center p-2 bg-green-100 text-black rounded-b-md">
            <p className="font-light">Powered by Netiqa Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsIcon() {
  return <i className="icofont-whatsapp text-2xl text-[#25d366]"></i>;
}
