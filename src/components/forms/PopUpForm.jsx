"use client";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { X, User, Mail, Phone, MapPin, MessageSquare, Download, Loader2 } from "lucide-react";

// Memoized Form Header
const FormHeader = memo(({ isResume }) => (
  <div className="text-center mb-8">
    <h3 className="text-2xl font-bold bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] bg-clip-text text-transparent mb-2">
      {isResume ? "Download Resume" : "Get In Touch"}
    </h3>
    <p className="text-gray-600 text-sm">
      {isResume
        ? "Please fill out this form to download my resume"
        : "Fill out the form below and I'll get back to you soon"}
    </p>
  </div>
));
FormHeader.displayName = 'FormHeader';

// Memoized Input Field Component
const FormInput = memo(({ icon: Icon, type, name, placeholder, value, onChange, onBlur, error, touched, disabled }) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-[rgb(117,78,249)]">
      <Icon className="w-5 h-5" />
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3 border text-black border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(117,78,249)] focus:border-transparent transition-colors duration-150"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
    />
    {touched && error && (
      <div className="text-red-500 text-xs mt-1 ml-2">{error}</div>
    )}
  </div>
));
FormInput.displayName = 'FormInput';

// Memoized Textarea Component
const FormTextarea = memo(({ name, placeholder, value, onChange, onBlur, error, touched, disabled }) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-[rgb(117,78,249)]">
      <MessageSquare className="w-5 h-5" />
    </div>
    <textarea
      name={name}
      placeholder={placeholder}
      rows={3}
      className="w-full text-black pl-12 pr-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(117,78,249)] focus:border-transparent transition-colors duration-150 resize-none"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
    />
    {touched && error && (
      <div className="text-red-500 text-xs mt-1 ml-2">{error}</div>
    )}
  </div>
));
FormTextarea.displayName = 'FormTextarea';

// Memoized Submit Button
const SubmitButton = memo(({ isSubmitting, isResume }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-[rgb(117,78,249)]/25 hover:shadow-[rgb(117,78,249)]/40 transition-shadow duration-150 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
  >
    {isSubmitting ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Processing...</span>
      </>
    ) : (
      <>
        <Download className="w-5 h-5" />
        <span>{isResume ? "Download Resume" : "Send Message"}</span>
      </>
    )}
  </button>
));
SubmitButton.displayName = 'SubmitButton';

const PopUpForm = ({ isOpen, onClose, isResume = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIP, setUserIP] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  // Memoize validation schema to prevent recreation
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
        email: Yup.string().required("Email is required").email("Invalid email"),
        phoneNumber: Yup.string()
          .matches(/^\d+$/, "Phone must contain only numbers")
          .test("valid-length", "Phone number must be 10 digits", (value) => value?.length === 10)
          .required("Phone number is required"),
        city: Yup.string().required("City is required"),
        message: Yup.string().required("Message is required"),
      }),
    []
  );

  // Memoized download function
  const downloadResume = useCallback(() => {
    try {
      const link = document.createElement("a");
      link.href = "/Ganesh-Kumbhar-Resume.pdf";
      link.download = "Ganesh-Kumbhar-Resume.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Resume download started!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to download resume. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      const submissionData = {
        fullName: values.name,
        email: values.email,
        mobNo: values.phoneNumber,
        city: values.city,
        msg: values.message,
        ipAddress: userIP,
        pageUrl: pageUrl,
      };

      try {
        await axios.post(`https://portfolio-form-backend-t69y.onrender.com/api/contact-form`, submissionData, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        });

        toast.success("Form submitted successfully.", {
          position: "top-right",
          autoClose: 4000,
        });

        resetForm();

        // Start download after a short delay if it's resume form
        if (isResume) {
          setTimeout(() => {
            downloadResume();
            onClose();
          }, 1500);
        } else {
          onClose();
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Oops! Something went wrong. Please try submitting the form again.", {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Fetch User's IP Address and page URL
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json", {
          timeout: 5000,
        });
        setUserIP(response.data.ip);
      } catch (error) {
        console.error("Failed to fetch IP address:", error);
        setUserIP("Unknown");
      }
    };

    if (isOpen) {
      fetchIP();
      if (typeof window !== "undefined") {
        setPageUrl(window.location.href);
      }
    } else {
      formik.resetForm();
    }
  }, [isOpen]);

  // Handle escape key and scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Memoized backdrop click handler
  const handleBackdropClick = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);

  // Memoized stop propagation handler
  const handleModalClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[rgb(117,78,249)] text-white rounded-full z-10 border border-white hover:bg-red-700 transition-colors duration-150 cursor-pointer"
          aria-label="Close form"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          <FormHeader isResume={isResume} />

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                icon={User}
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.name}
                touched={formik.touched.name}
                disabled={isSubmitting}
              />

              <FormInput
                icon={Mail}
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
                disabled={isSubmitting}
              />
            </div>

            {/* Phone & City Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                icon={Phone}
                type="text"
                name="phoneNumber"
                placeholder="Enter your 10-digit phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.phoneNumber}
                touched={formik.touched.phoneNumber}
                disabled={isSubmitting}
              />

              <FormInput
                icon={MapPin}
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.city}
                touched={formik.touched.city}
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <FormTextarea
              name="message"
              placeholder="Enter your message here"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.message}
              touched={formik.touched.message}
              disabled={isSubmitting}
            />

            <SubmitButton isSubmitting={isSubmitting} isResume={isResume} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(PopUpForm);
