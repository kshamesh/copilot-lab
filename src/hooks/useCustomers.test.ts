import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import type { ReactNode } from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useCustomers } from "../hooks/useCustomers";
import { store } from "../store/store";
import * as mockApi from "../api/customerApiMock";

// Mock the mock API module
vi.mock("../api/customerApiMock");

const wrapper = ({ children }: { children: ReactNode }) =>
  React.createElement(Provider, { store, children });

describe("useCustomers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch customers on mount", async () => {
    const mockCustomers = [
      { id: "1", name: "Alice", email: "alice@test.com", phone: "555-0101" },
    ];

    vi.mocked(mockApi.fetchCustomers).mockResolvedValue({
      success: true,
      data: mockCustomers,
    });

    const { result } = renderHook(() => useCustomers(), { wrapper });

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customers).toEqual(mockCustomers);
  });

  it("should add a new customer", async () => {
    const mockNewCustomer = {
      id: "2",
      name: "Bob",
      email: "bob@test.com",
      phone: "555-0102",
    };

    vi.mocked(mockApi.fetchCustomers).mockResolvedValue({
      success: true,
      data: [],
    });
    vi.mocked(mockApi.createCustomer).mockResolvedValue({
      success: true,
      data: mockNewCustomer,
    });

    const { result } = renderHook(() => useCustomers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      const success = await result.current.addCustomer({
        name: "Bob",
        email: "bob@test.com",
        phone: "555-0102",
      });
      expect(success).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.customers).toContainEqual(mockNewCustomer);
    });
  });

  it("should delete a customer", async () => {
    const initialCustomers = [
      { id: "1", name: "Alice", email: "alice@test.com", phone: "555-0101" },
    ];

    vi.mocked(mockApi.fetchCustomers).mockResolvedValue({
      success: true,
      data: initialCustomers,
    });
    vi.mocked(mockApi.deleteCustomer).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useCustomers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      const success = await result.current.removeCustomer("1");
      expect(success).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.customers?.length).toBe(0);
    });
  });

  it("should handle API errors", async () => {
    vi.mocked(mockApi.fetchCustomers).mockResolvedValue({
      success: false,
      error: "Network error",
    });

    const { result } = renderHook(() => useCustomers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
  });
});
