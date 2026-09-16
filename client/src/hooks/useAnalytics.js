import { useCallback, useEffect, useState } from "react";
import analyticsService from "../services/analyticsService";

const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await analyticsService.getAnalytics();

      if (response?.success) {
        setAnalytics(response.data);
      } else {
        setError(response?.message || "Failed to fetch analytics.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load analytics data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics,
  };
};

export default useAnalytics;