import React, { useState } from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 150px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: green;
  font-size: 18px;
`;

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    body: "",
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add further validation if needed here
    if (form.name && form.subject && form.email && form.body) {
      // In a real-world app, you would send this data to an API here
      console.log("Form Submitted:", form);
      setMessageSent(true);
      setForm({ name: "", subject: "", email: "", body: "" }); // Reset form
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  return (
    <PageWrapper>
      <h1>Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          minLength="3"
        />
        <Input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          minLength="3"
        />
        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          required
        />
        <Textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Message"
          required
          minLength="3"
        />
        <Button type="submit">Submit</Button>
      </Form>
      {messageSent && <Message>Your message has been sent successfully!</Message>}
    </PageWrapper>
  );
};

export default ContactPage;
