import { useCallback, useEffect, useState } from "react";

import doctorAnalyticsService from "../services/doctorAnalyticsService";

const useDoctorAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await doctorAnalyticsService.getDoctorAnalytics();

      if (response?.success) {
        setAnalytics(response.data);
      } else {
        setError(
          response?.message || "Failed to fetch doctor analytics."
        );
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load doctor analytics."
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

export default useDoctorAnalytics;