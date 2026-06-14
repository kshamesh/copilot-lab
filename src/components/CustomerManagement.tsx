import './CustomerManagement.css'
import { useCustomers } from '../hooks/useCustomers'
import { CustomerList } from './CustomerList'
import { CustomerForm } from './CustomerForm'

// Main customer management page - combines form and list with loading/error states
export function CustomerManagement() {
  const { customers, loading, error, addCustomer, removeCustomer } = useCustomers()

  return (
    <div className="customer-management">
      <h1>Customer Management</h1>

      {error && <div className="error-state">{error}</div>}

      <div className="customer-sections">
        <section className="form-section">
          <h2>Add New Customer</h2>
          <CustomerForm onSubmit={addCustomer} loading={loading} />
        </section>

        <section className="list-section">
          <h2>Customers</h2>
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading customers...</p>
            </div>
          ) : (
            <CustomerList customers={customers} onDelete={removeCustomer} />
          )}
        </section>
      </div>
    </div>
  )
}
