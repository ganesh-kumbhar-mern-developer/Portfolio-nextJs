import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPhone, FaWhatsapp, FaTimes } from "react-icons/fa";
import whatsappcall from "../../../public/images/whatsapp-call.svg"; // Adjust the path as necessary
function ContactButtons({ message, whatsappno, phoneno }) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = whatsappno || "NA";
  const phoneNumber = phoneno || "NA";

  const cleanedTitle = message;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style>{`
  @keyframes cc-calto-action-ripple {
    0% {
      box-shadow:
        rgba(55, 55, 55, 0.2) 0px 4px 10px,
        rgba(117, 78, 249, 0.2) 0px 0px 0px 0px,
        rgba(147, 108, 255, 0.2) 0px 0px 0px 5px,
        rgba(117, 78, 249, 0.13) 0px 0px 0px 10px;
    }
    100% {
      box-shadow:
        rgba(55, 55, 55, 0.2) 0px 4px 10px,
        rgba(117, 78, 249, 0.2) 0px 0px 0px 5px,
        rgba(147, 108, 255, 0.2) 0px 0px 0px 10px,
        rgba(117, 78, 249, 0.13) 0px 0px 0px 20px;
    }
  }

  .ripple {
    animation: cc-calto-action-ripple 1s linear infinite;
  }

  .option-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .option-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
  
  .option-exit {
    opacity: 1;
  }
  
  .option-exit-active {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 300ms, transform 300ms;
  }
`}</style>

      <div
        className="fixed-bottom right-[12px] md:right-[25px] p-3 flex flex-col items-end"
        style={{
          zIndex: 99999,
          gap: "15px",
          position: "fixed",
          bottom: "25px",
        }}
      >
        {/* Options that appear when main button is clicked */}
        {isOpen && (
          <div className="flex flex-col gap-4 mb-4 mr-2">
            {/* WhatsApp Option */}
            <div className="flex items-center">
              <Link
                href={`https://api.whatsapp.com/send?phone=+91${whatsappNumber}&text=Hi+I+am+looking+for+${cleanedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us"
                className="flex items-center bg-green-500 text-black ripple rounded-full p-4 mb-3 md:mb-4"
              >
                {/* <span className="mr-2 font-semibold">Chat With Us</span> */}
                <div className="bg-green-500 rounded-full flex justify-center items-center h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]">
                  <FaWhatsapp size={36} className="text-white" />
                </div>
              </Link>
            </div>

            {/* Phone Option */}
            <div className="flex items-center">
              <Link
                href={`tel:${phoneNumber}`}
                aria-label="Call Us Now"
                className="flex items-center bg-red-600 text-black ripple rounded-full p-4"
              >
                {/* <span className="mr-2 font-semibold">Call Us Now</span> */}
                <div className="bg-red-600 rounded-full flex justify-center items-center h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]">
                  <FaPhone size={32} className="text-white rotate-90" />
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={toggleMenu}
          className={`sm:h-20 sm:w-20 h-16 w-16 flex justify-center items-center rounded-full transition-transform ${
            isOpen ? "bg-white" : "bg-white ripple"
          }`}
        >
          {isOpen ? (
            <FaTimes size={24} className="text-black" />
          ) : (
            <div className="relative flex items-center justify-center">
              {/* <div className="absolute">
                <FaPhone size={20} className="text-red-600" />
              </div>
              <div className="absolute translate-x-2 -translate-y-2">
                <FaWhatsapp size={14} className="text-green-500" />
              </div> */}
              <Image
                src={whatsappcall}
                alt="WhatsApp and Call"
                width={80} // For sm:w-20 (5rem = 80px)
                height={80} // For sm:h-20 (5rem = 80px)
                className="sm:h-20 sm:w-20 h-16 w-16 object-cover"
              />
            </div>
          )}
        </button>
      </div>
    </>
  );
}

export default ContactButtons;
