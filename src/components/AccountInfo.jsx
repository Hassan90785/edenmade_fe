// RegisterStep.js

import React from "react";
import {ValidatedInput} from "./ValidateInput.jsx";
import {useAuth} from "../auth_v2/authContext.jsx";
import {updateCustomerDetails} from "../rest_apis/restApi.jsx";
import {toast} from "react-toastify";

const AccountInfo = () => {
    const {user, setUserDetails} = useAuth();
    const updateUserDetails = (prop, value) => {
        console.log('Props:', prop)
        console.log('value:', value)
        const updatedUser = {...user, [prop]: value};
        // Update user details using setUserDetails function
        setUserDetails(updatedUser);
    };
    const saveChanges = async () => {
        const data = await updateCustomerDetails(user);
        console.log('data', data)
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(data))
        setUserDetails(data);
        toast.success("Customer details updated Successfully");
    };
    // Implement your UI and logic for registering
    return (
        <div>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h1 className=" aj-site-logo w-100  text-center ">
                            Account Info
                        </h1>
                        <button
                            type="button"
                            className="btn btn-close"
                            data-bs-dismiss="modal"
                        >
                            <i className="fi fi-rr-rectangle-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row ">
                            <div className="col-12 px-md-5 px-3 my-5">
                                <div className="row">
                                    <div className="col-12">
                                        <ValidatedInput
                                            type="text"
                                            id="deatilFirstName"
                                            name="first_name"
                                            placeholder="First Name*"
                                            value={user?.first_name}
                                            inputType={'s'}
                                            onChange={(value) => updateUserDetails("first_name", value)}
                                        />

                                    </div>
                                    <div className="col-12">
                                        <ValidatedInput
                                            type="text"
                                            id="deatilLastName"
                                            name="last_name"
                                            placeholder="Last Name*"
                                            value={user?.last_name}
                                            inputType={'s'}
                                            onChange={(value) => updateUserDetails("last_name", value)}
                                        />

                                    </div>
                                    <div className="col-12">
                                        <ValidatedInput
                                            type="text"
                                            id="deatilPhone"
                                            name="phone_number"
                                            placeholder="Phone Number"
                                            value={user?.phone_number}
                                            inputType={'n'}
                                            onChange={(value) => updateUserDetails("phone_number", value)}
                                        />

                                    </div>
                                    <div className="col-12">

                                        <ValidatedInput
                                            type="text"
                                            id="deatilAddress"
                                            name="address"
                                            placeholder="Address"
                                            value={user?.address}
                                            inputType={'e'}
                                            onChange={(value) => updateUserDetails("address", value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <ValidatedInput
                                            type="text"
                                            id="deatilCity"
                                            name="city"
                                            placeholder="City"
                                            value={user?.city}
                                            inputType={'s'}
                                            onChange={(value) => updateUserDetails("city", value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <ValidatedInput
                                            type="text"
                                            id="deatilZip"
                                            name="postal_code"
                                            placeholder="Postal Code"
                                            value={user?.postal_code}
                                            inputType={'n'}
                                            onChange={(value) => updateUserDetails("postal_code", value)}
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">

                        <button type="button" className="btn btn-primary aj-button body-text-small fw-700 px-5"
                                onClick={saveChanges}>Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
