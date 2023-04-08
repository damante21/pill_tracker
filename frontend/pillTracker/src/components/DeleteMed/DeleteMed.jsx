import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function DeleteMedicine(props) {

    const base_url = import.meta.env.VITE_REACT_APP_BASE_URL
    const userToken = "Token " + localStorage.getItem("token");
    const navigate = useNavigate();

    // delete button
    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this medicine?');
        if (confirmDelete) {
          try {
            const response = await fetch(`http://${base_url}/api/med/${props.med_id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
              }
            });
            if (response.ok) {
              navigate('/');
            } else {
              alert('An error occurred while deleting medicine. Please try again.');
            }
          } catch(err) {
            alert('An error occurred while deleting medicine.');
            console.error(err);
          }
        }
      }

    return (
        <div>
            <Button type="dashed" danger onClick={handleDeleteClick}>
                Delete
            </Button>
        </div>
    );
}

export default DeleteMedicine;