import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Button, Row, Col, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { init } from 'emailjs-com';
import { apiKey } from '../sendingEmailAPI/emailkey'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

init("user_uMPxwYUY88KvnHsPAD5bz");

export const App = () => {
  const handleEmailSubmit = (emailDetails) => {
    const DATA = {
      service_id: apiKey.SERVICE_ID,
      template_id: apiKey.TEMPLATE_ID,
      user_id: apiKey.USER_ID,
      template_params: emailDetails
    };

    const URL = 'https://api.emailjs.com/api/v1.0/email/send';

    axios.post(URL, DATA).then(res => {
      () => toast.success("Email is sent.")
    }).catch(err => {
      () => toast.error("Something went wrong, please try again...");
    });
  };

  const submitForm = (event, errors, values) => {
    if (errors.length === 0) {
      const emailDetails = {
        ...values
      };

      handleEmailSubmit(emailDetails);
    }
  };

  return <>
    <Row className="justify-content-center">
      <Col md="8">
        <h2 id="jonesFormLabel">
          Jones Form
        </h2>
      </Col>
    </Row>
    <AvForm onSubmit={submitForm}>
      <Row className="justify-content-center">
        <Col md="8">
          <AvGroup>
            <Label id="firstNameLabel" for="firstName">
              First Name
            </Label>
            <AvField
              id="firstName"
              type="text"
              name="firstName"
              validate={{
                required: { value: true, errorMessage: "First name is required" },
                minLength: { value: 2, errorMessage: "Minimum length required is 2" },
                pattern: { value: '^[A-Za-z]+$', errorMessage: "First name must be only alphabetical characters" }
              }}
            />
          </AvGroup>
          <AvGroup>
            <Label id="lastNameLabel" for="lastName">
              Last Name
            </Label>
            <AvField
              id="lastName"
              type="text"
              name="lastName"
              validate={{
                required: { value: true, errorMessage: "Last name is required" },
                minLength: { value: 2, errorMessage: "Minimum length required is 2" },
                pattern: { value: '^[A-Za-z]+$', errorMessage: "First name must be only alphabetical characters" }
              }}
            />
          </AvGroup>
          <AvGroup>
            <Label id="emailLabel" for="email">
              Email
            </Label>
            <AvField
              id="email"
              type="text"
              name="email"
              validate={{
                required: { value: true, errorMessage: "Email is required" },
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  errorMessage: "Email must be similar to the format of email@jones.com"
                }
              }}
            />
          </AvGroup>
          <AvGroup>
            <Label id="mobileNumberLabel" for="mobileNumber">
              Mobile Number
            </Label>
            <AvField
              id="mobileNumber"
              type="text"
              name="mobileNumber"
              validate={{
                required: { value: true, errorMessage: "Mobile number is required" },
                pattern: { value: '^[0-9]{10}$', errorMessage: "Mobile number must be exactly 10 digits" }
              }}
            />
          </AvGroup>
          &nbsp;
          <Button color="primary" id="save-details" type="submit">
            <FontAwesomeIcon icon="save" />
            &nbsp;
            Submit
          </Button>
        </Col>
      </Row>
    </AvForm>
  </>
}

export default App;
