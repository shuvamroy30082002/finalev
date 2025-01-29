import React, { useEffect, useState } from "react";
import styles from "./SettingsContainer.module.css";
import DeleteAccountModal from "../../components/DeleteModal/DeleteAccountModal";
import { baseUrl } from "../../Urls";

const SettingsContainer = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleDeleteVisible = () => {
    setDeleteVisible(!deleteVisible);
  };

  useEffect(() => {
    // Populate form data when the user prop is received
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.ph || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Changes saved successfully");
        const updatedUser = await response.json();
        console.log("Updated User:", updatedUser);
      } else {
        alert("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving changes");
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.inputSections}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mobile No.</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
      </div>

      <button onClick={handleSave}>Save Changes</button>

      <button onClick={handleDeleteVisible}>Delete Account</button>
      {deleteVisible && <DeleteAccountModal onClose={handleDeleteVisible} />}
    </div>
  );
};

export default SettingsContainer;