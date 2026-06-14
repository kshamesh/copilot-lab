// Customer data model
export interface Customer {
  id: string
  name: string
  email: string
  phone: string
}

// API request/response types
export interface CreateCustomerRequest {
  name: string
  email: string
  phone: string
}

export interface UpdateCustomerRequest extends CreateCustomerRequest {}

export interface CustomerResponse {
  success: boolean
  data?: Customer
  error?: string
}

export interface CustomersListResponse {
  success: boolean
  data?: Customer[]
  error?: string
}
