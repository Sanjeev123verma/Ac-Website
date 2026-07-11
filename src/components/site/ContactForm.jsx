"use client";

import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import AsyncSelect from "react-select/async";
import * as Yup from "yup";
import { services } from "./siteData";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name should be 30 characters or less")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit number")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
  service: Yup.string().required("Service is required"),
  message: Yup.string().min(5, "Message should be at least 5 characters"),
});

const fallbackOptions = services.map((service) => ({
  label: service.title,
  value: service.title,
}));

export default function ContactForm({ selectedService = "" }) {
  const initialValues = {
    name: "",
    phone: "",
    address: "",
    service: selectedService,
    message: "",
  };

  const loadServiceOptions = async (inputValue) => {
    try {
      const res = await fetch(`/api/service?search=${inputValue}`);
      const data = await res.json();
      const apiOptions =
        data?.data?.services?.map((service) => ({
          label: service.service,
          value: service.service,
        })) || [];

      return apiOptions.length ? apiOptions : fallbackOptions;
    } catch {
      return fallbackOptions;
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/api/contact", values);

      if (response.status === 200) {
        toast.success("Booking received. Our technician will contact you.");
        resetForm();
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="poster-shadow border-2 border-ink bg-paper p-6 md:p-8">
      <p className="stamp-label mb-5 w-fit bg-royal text-white">Booking slip</p>
      <h2 className="font-serif text-4xl font-black text-ink">Service request</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="mt-7 grid gap-5">
            <FormField name="name" placeholder="Your name" />
            <FormField name="phone" placeholder="Phone number" />
            <FormField name="address" placeholder="Full address" as="textarea" />

            <div>
              <AsyncSelect
                cacheOptions
                defaultOptions={fallbackOptions}
                loadOptions={loadServiceOptions}
                value={
                  values.service
                    ? { label: values.service, value: values.service }
                    : null
                }
                onChange={(selectedOption) =>
                  setFieldValue("service", selectedOption?.value || "")
                }
                placeholder="Select service..."
                classNamePrefix="repair-select"
              />
              <ErrorMessage name="service" component="p" className="mt-1 text-sm font-bold text-red-700" />
            </div>

            <FormField name="message" placeholder="Problem details" as="textarea" optional />

            <button type="submit" disabled={isSubmitting} className="btn-print justify-center disabled:opacity-60">
              {isSubmitting ? "Sending..." : "Send booking"}
              <Send size={18} />
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

function FormField({ name, placeholder, as, optional }) {
  return (
    <div>
      <Field
        as={as}
        name={name}
        placeholder={optional ? `${placeholder} (optional)` : placeholder}
        className={`field-print ${as === "textarea" ? "min-h-28 resize-y" : ""}`}
      />
      <ErrorMessage name={name} component="p" className="mt-1 text-sm font-bold text-red-700" />
    </div>
  );
}
