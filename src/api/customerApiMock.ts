import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerResponse,
  CustomersListResponse,
} from "../types/customer";

const API_DELAY = 300;

export async function fetchCustomers(): Promise<CustomersListResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            id: "1",
            name: "Alice Johnson",
            email: "alice@example.com",
            phone: "555-0101",
          },
          {
            id: "2",
            name: "Bob Smith",
            email: "bob@example.com",
            phone: "555-0102",
          },
        ],
      });
    }, API_DELAY);
  });
}

export async function createCustomer(
  request: CreateCustomerRequest,
): Promise<CustomerResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: { id: Date.now().toString(), ...request },
      });
    }, API_DELAY);
  });
}

export async function updateCustomer(
  id: string,
  request: UpdateCustomerRequest,
): Promise<CustomerResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: { id, ...request },
      });
    }, API_DELAY);
  });
}

export async function deleteCustomer(_id: string): Promise<CustomerResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, API_DELAY);
  });
}
