"use client";
import React, { useState } from "react";
import PageHeader from "@/components/Pageheader";
import { ContactInformation } from "@/components/ContactInformation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import AsyncSelect from "react-select/async";
import { useFormikContext } from "formik";

const ContactPage = () => {

  const searchParams = useSearchParams();
  const serviceQuery = searchParams.get("service");
  // Initial values for Formik
  const initialValues = {
    name: "",
    phone: "",
    address: "",
    service: "",
    message: "",
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name should be 20 characters or less")
      .required("Required"),
    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit number")
      .required("Required"),
    address: Yup.string().required("Required"),
    service: Yup.string().required("Required"),
    message: Yup.string().min(5, "Message should be at least 5 characters"),
  });

  // Handle form submission with axios
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    try {
      const response = await axios.post("/api/contact", values);

      if (response.status === 200) {
        toast.success(
          "Form submitted successfully! Our technician will contact you.",
          {
            className: "text-xl font-semibold text-blue-800",
          }
        );
        resetForm();
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const loadServiceOptions = async (inputValue) => {
    const res = await fetch(`/api/service?search=${inputValue}`);
    const data = await res.json();

    return (
      data?.data?.services?.map((s) => ({
        label: s.service,
        value: s.service,
      })) || []
    );
  };

  return (
    <>
      <PageHeader title="Contact us" breadcrumb=" Contact us" />
      <div className="container mx-auto px-4 py-2 md:w-4/5">
        <h1 className="text-3xl font-bold mb-4 text-center">Get in Touch</h1>
        {/* Flex container for form and contact information */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Form section */}
          <div className="md:w-1/2 p-4 sm:p-12 bg-blue-200">
            <h2 className="text-2xl font-semibold mb-4">
              {serviceQuery || "Contact Form"}
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status, setFieldValue, values }) => (
                <Form className="space-y-4">
                  <div>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      as="textarea"
                      id="address"
                      name="address"
                      placeholder="Address"
                      className="w-full p-2 border rounded h-16"
                    />
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="">
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={loadServiceOptions}
                      value={
                        values.service
                          ? { label: values.service, value: values.service }
                          : null
                      }
                      onChange={(selectedOption) =>
                        setFieldValue("service", selectedOption?.value)
                      }
                      placeholder="Select service..."
                      className="text-left"
                    />
                    <ErrorMessage
                      name="service"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      placeholder="Message"
                      className="w-full p-2 border rounded h-32"
                    />
                    <ErrorMessage
                      name="message"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Book now"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Contact Information section */}
          <div className="md:w-1/2">
            <ContactInformation />
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="m-2">
        <h1 className="text-4xl font-bold text-center mt-10 mb-2">
          Our Location
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3873013677403!2d72.84887097425795!3d19.30899304461867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b02b2d5c65cb%3A0xe2f32eb9fb1839ed!2sNirmala%20Niketan%20High%20School!5e0!3m2!1sen!2sin!4v1732011957419!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="shadow-lg rounded-lg"
        ></iframe>
      </div>
    </>
  );
};

export default ContactPage;
