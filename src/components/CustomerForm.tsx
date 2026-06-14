import { useState } from "react";
import { type CreateCustomerRequest } from "../types/customer";
import "./CustomerForm.css";

interface CustomerFormProps {
  onSubmit: (data: CreateCustomerRequest) => Promise<boolean>;
  loading?: boolean;
}

// Form to create new customers
export function CustomerForm({ onSubmit, loading = false }: CustomerFormProps) {
  const [formData, setFormData] = useState<CreateCustomerRequest>({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) {
      setFormData({ name: "", email: "", phone: "" });
    }
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Customer"}
      </button>
    </form>
  );
}
