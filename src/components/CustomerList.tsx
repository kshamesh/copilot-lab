import "./CustomerList.css";
import { type Customer } from "../types/customer";

interface CustomerListProps {
  customers: Customer[] | undefined;
  onDelete: (id: string) => void;
}

// Displays list of customers in a table format
export function CustomerList({ customers, onDelete }: CustomerListProps) {
  if (!customers || customers.length === 0) {
    return <p className="empty-state">No customers found</p>;
  }

  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
              <button
                className="delete-btn"
                onClick={() => onDelete(customer.id)}
                aria-label={`Delete ${customer.name}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
