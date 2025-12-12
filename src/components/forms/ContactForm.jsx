"use client";
import { useMemo, memo, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Send, MessageSquare, User, Mail, Phone, FileText, MessageCircle, Loader2, Sparkles } from "lucide-react";

// Memoized Form Header
const FormHeader = memo(() => (
  <div className="text-center mb-8 opacity-0 animate-slide-in" style={{ animationDelay: "200ms" }}>
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl mb-4 shadow-lg shadow-indigo-500/30">
      <MessageSquare className="w-10 h-10 text-white" />
    </div>
    <h2 className="text-3xl font-bold text-white mb-2">Let's Connect</h2>
  </div>
));
FormHeader.displayName = 'FormHeader';

// Memoized Input Field Component
const FormInput = memo(({ 
  icon: Icon, 
  label, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  disabled,
  delay 
}) => (
  <div className="opacity-0 animate-slide-in" style={{ animationDelay: `${delay}ms` }}>
    <label className="block text-indigo-300 font-semibold mb-3">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400 group-focus-within:text-indigo-300 transition-colors duration-150" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full bg-gray-800/60 border-2 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none transition-colors duration-150 ${
          touched && error
            ? "border-red-400 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
            : "border-indigo-500/30 focus:border-indigo-400 focus:shadow-lg focus:shadow-indigo-500/20 hover:border-indigo-400/50"
        }`}
      />
      {touched && error && (
        <p className="text-red-400 text-sm mt-2 opacity-0 animate-fade-in">{error}</p>
      )}
    </div>
  </div>
));
FormInput.displayName = 'FormInput';

// Memoized Textarea Component
const FormTextarea = memo(({ 
  name, 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  disabled 
}) => (
  <div className="opacity-0 animate-slide-in" style={{ animationDelay: "700ms" }}>
    <label className="block text-indigo-300 font-semibold mb-3">Message</label>
    <div className="relative group">
      <MessageCircle className="absolute left-4 top-6 w-5 h-5 text-indigo-400 group-focus-within:text-indigo-300 transition-colors duration-150" />
      <textarea
        name={name}
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full bg-gray-800/60 border-2 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none resize-none transition-colors duration-150 ${
          touched && error
            ? "border-red-400 focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20"
            : "border-indigo-500/30 focus:border-indigo-400 focus:shadow-lg focus:shadow-indigo-500/20 hover:border-indigo-400/50"
        }`}
      />
      {touched && error && (
        <p className="text-red-400 text-sm mt-2 opacity-0 animate-fade-in">{error}</p>
      )}
    </div>
  </div>
));
FormTextarea.displayName = 'FormTextarea';

// Memoized Submit Button
const SubmitButton = memo(({ isSubmitting }) => (
  <div className="opacity-0 animate-slide-in" style={{ animationDelay: "800ms" }}>
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-2xl transition-colors duration-200 flex items-center justify-center space-x-3 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Sending Message...</span>
        </>
      ) : (
        <>
          <Send className="w-6 h-6" />
          <span>Send Message</span>
          <Sparkles className="w-5 h-5" />
        </>
      )}
    </button>
  </div>
));
SubmitButton.displayName = 'SubmitButton';

const ContactForm = () => {
  // Memoize validation schema for better performance
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
          .min(5, "City must be at least 3 characters")
          .max(100, "City must be less than 20 characters")
          .required("City is required"),
        msg: Yup.string()
          .min(10, "Message must be at least 10 characters")
          .max(500, "Message must be less than 500 characters")
          .required("Message is required"),
      }),
    []
  );

  // Memoized toast configuration
  const toastConfig = useMemo(
    () => ({
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);

        await axios.post("https://portfolio-form-backend-t69y.onrender.com/api/contact-form", values, {
          timeout: 10000,
        });

        toast.success("Form submitted successfully.", {
          ...toastConfig,
          autoClose: 5000,
        });

        resetForm();
      } catch (error) {
        console.error("Contact form error:", error);

        const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";

        toast.error(errorMessage, {
          ...toastConfig,
          autoClose: 6000,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="relative opacity-0 animate-fade-in">
      {/* Decorative Elements */}
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-indigo-500/20 rounded-full blur-2xl" />

      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10">
        <FormHeader />

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              icon={User}
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Your full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.fullName}
              touched={formik.touched.fullName}
              disabled={formik.isSubmitting}
              delay={300}
            />

            <FormInput
              icon={Mail}
              label="Email Address"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              disabled={formik.isSubmitting}
              delay={400}
            />
          </div>

          {/* Phone and Subject Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              icon={Phone}
              label="Mobile Number"
              type="tel"
              name="mobNo"
              placeholder="Your mobile number"
              value={formik.values.mobNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.mobNo}
              touched={formik.touched.mobNo}
              disabled={formik.isSubmitting}
              delay={500}
            />

            <FormInput
              icon={FileText}
              label="Subject"
              type="text"
              name="city"
              placeholder="What's this about?"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.city}
              touched={formik.touched.city}
              disabled={formik.isSubmitting}
              delay={600}
            />
          </div>

          {/* Message */}
          <FormTextarea
            name="msg"
            placeholder="Tell me about your project or just say hello..."
            value={formik.values.msg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.msg}
            touched={formik.touched.msg}
            disabled={formik.isSubmitting}
          />

          <SubmitButton isSubmitting={formik.isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default memo(ContactForm);
