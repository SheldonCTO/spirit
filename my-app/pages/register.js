import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { newUser, authenticateUser } from "@/lib/authenticate";
import { useRouter } from 'next/router';

export default function SignUp(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password validation error
  const [otp, setOtp] = useState("");  // OTP state to store the entered OTP
  const [sentOtp, setSentOtp] = useState(false);  // Flag to track if OTP has been sent
  const [otpError, setOtpError] = useState("");  // Error message for invalid OTP
  const router = useRouter();

  // Regular expression for validating the password
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/;

  // Function to send OTP to the user's email
  const sendOtpEmail = async (email) => {
    try {
      const response = await fetch('http://localhost:8080/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (response.ok) {
        setSentOtp(true);
      } else {
        setWarning({ message: data.error, type: "danger" });
      }
    } catch (err) {
      setWarning({ message: "Error sending OTP", type: "danger" });
    }
  };

  // Function to handle OTP verification
  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await response.json();
      if (response.ok) {
        await newUser(user, password, password2, phone);
        authenticateUser(user, password);  // Log the user in after successful OTP verification
        router.push("/products");  // Redirect to products page
      } else {
        setOtpError(data.error || "Invalid OTP");
      }
    } catch (err) {
      setOtpError("Error verifying OTP");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate the password before submission
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, contain at least one letter, one number, and one symbol.");
      return; // Stop submission if password is invalid
    }

    // Check if passwords match
    if (password !== password2) {
      setPasswordError("Passwords do not match.");
      return;
    }

    // Register the user and send OTP to the provided email
    try {
      await newUser(user, password, password2, phone);
      sendOtpEmail(email);  // Send OTP after successful user registration
    } catch (err) {
      setWarning({ message: err.message, type: "danger" });
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Sign-Up</h2>
          Enter your information below:
        </Card.Body>
      </Card>

      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>UserName:</Form.Label>
          <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={e => {
              setPassword(e.target.value);
              setPasswordError("");  // Clear password error on input change
            }} 
            isInvalid={passwordError}
          />
          {passwordError && <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control 
            type="password" 
            value={password2} 
            onChange={e => setPassword2(e.target.value)} 
            isInvalid={passwordError}
          />
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="phone" value={phone} onChange={e => setPhone(e.target.value)} />
        </Form.Group>

        {warning && <>
          <br />
          <Alert variant={warning.type}>
            {warning.message}
          </Alert>
        </>}

        {/* Show OTP input field after registration */}
        {sentOtp && (
          <div>
            <Form.Group>
              <Form.Label>Enter OTP sent to your email:</Form.Label>
              <Form.Control
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                isInvalid={otpError}
              />
              {otpError && <Form.Control.Feedback type="invalid">{otpError}</Form.Control.Feedback>}
            </Form.Group>
            <Button variant="primary" onClick={verifyOtp}>
              Verify OTP
            </Button>
          </div>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit" disabled={sentOtp}>
          {sentOtp ? 'Resend OTP' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}
