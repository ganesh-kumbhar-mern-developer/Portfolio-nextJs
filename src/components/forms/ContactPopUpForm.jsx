"use client";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { X, User, Mail, Phone, FileText, MessageSquare, Send, Loader2 } from "lucide-react";

// Memoized Form Header
const FormHeader = memo(() => (
  <div className="text-center mb-8">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[rgb(117,78,249)] to-[rgb(147,108,255)] rounded-2xl mb-4 shadow-lg shadow-[rgb(117,78,249)]/30">
      <MessageSquare className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-2xl font-bold bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] bg-clip-text text-transparent mb-2">
      Get In Touch
    </h3>
    <p className="text-gray-600 text-sm">I'd love to hear from you. Send me a message!</p>
  </div>
));
FormHeader.displayName = 'FormHeader';

// Memoized Input Field Component
const FormInput = memo(({ 
  icon: Icon, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  disabled,
  autoComplete 
}) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-[rgb(117,78,249)]">
      <Icon className="w-5 h-5" />
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[rgb(117,78,249)] focus:border-transparent transition-colors duration-150"
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      autoComplete={autoComplete}
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
      rows={4}
      className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[rgb(117,78,249)] focus:border-transparent transition-colors duration-150 resize-none"
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
const SubmitButton = memo(({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-gradient-to-r from-[rgb(117,78,249)] to-[rgb(147,108,255)] text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-[rgb(117,78,249)]/25 hover:shadow-[rgb(117,78,249)]/40 transition-shadow duration-150 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
  >
    {isSubmitting ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Sending...</span>
      </>
    ) : (
      <>
        <Send className="w-5 h-5" />
        <span>Send Message</span>
      </>
    )}
  </button>
));
SubmitButton.displayName = 'SubmitButton';

const ContactPopUpForm = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIP, setUserIP] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  // Memoize validation schema to prevent recreation
  const validationSchema = useMemo(
    () =>
      Yup.object({
        fullName: Yup.string()
          .min(2, "Name must be at least 2 characters")
          .max(50, "Name must be less than 50 characters")
          .required("Full name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        mobNo: Yup.string()
          .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
          .required("Mobile number is required"),
        city: Yup.string()
          .min(3, "City must be at least 3 characters")
          .max(20, "City must be less than 20 characters")
          .required("City is required"),
        msg: Yup.string()
          .min(10, "Message must be at least 10 characters")
          .max(500, "Message must be less than 500 characters")
          .required("Message is required"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobNo: "",
      city: "",
      msg: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      const submissionData = {
        fullName: values.fullName,
        email: values.email,
        mobNo: values.mobNo,
        city: values.city,
        msg: values.msg,
        ipAddress: userIP,
        pageUrl: pageUrl,
      };

      try {
        await axios.post(
          `https://portfolio-form-backend-t69y.onrender.com/api/contact-form`,
          submissionData,
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          }
        );

        toast.success("Form submitted successfully.", {
          position: "top-right",
          autoClose: 5000,
        });

        resetForm();
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Contact form error:", error);
        toast.error("Oops! Something went wrong. Please try submitting the form again.", {
          position: "top-right",
          autoClose: 6000,
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
        const response = await axios.get("https://api.ipify.org?format=json", { timeout: 5000 });
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
    }
  }, [isOpen]);

  // Handle escape key and prevent scroll
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
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[rgb(117,78,249)] text-white rounded-full z-10 border border-white hover:bg-red-700 transition-colors duration-150 focus:outline-none"
          aria-label="Close form"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          <FormHeader />

          <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                icon={User}
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.fullName}
                touched={formik.touched.fullName}
                disabled={isSubmitting}
                autoComplete="name"
              />

              <FormInput
                icon={Mail}
                type="email"
                name="email"
                placeholder="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.email}
                touched={formik.touched.email}
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>

            {/* Phone and City Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                icon={Phone}
                type="tel"
                name="mobNo"
                placeholder="Mobile Number"
                value={formik.values.mobNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.mobNo}
                touched={formik.touched.mobNo}
                disabled={isSubmitting}
                autoComplete="tel"
              />

              <FormInput
                icon={FileText}
                type="text"
                name="city"
                placeholder="Subject"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.city}
                touched={formik.touched.city}
                disabled={isSubmitting}
                autoComplete="off"
              />
            </div>

            {/* Message */}
            <FormTextarea
              name="msg"
              placeholder="Your message here..."
              value={formik.values.msg}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.msg}
              touched={formik.touched.msg}
              disabled={isSubmitting}
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(ContactPopUpForm);
