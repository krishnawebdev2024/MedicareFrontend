import React from "react";
import { useAuthContext } from "../../contexts/userContext";
import { useDoctorContext } from "../../contexts/doctorContext";
import { useAdminContext } from "../../contexts/adminContext";
const Dashboard = () => {
  const { user, loading, error } = useAuthContext();
  const { doctor, loading, error } = useDoctorContext();
  const { admin, loading, error } = useAdminContext();

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        {user.role}
      </p>
      <p className="text-xl text-gray-400 mb-4">{doctor.role}</p>
      <p className="text-xl text-gray-400 mb-4">{admin.role}</p>
    </div>
  );
};

export default Dashboard;
