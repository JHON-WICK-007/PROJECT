# 🔐 Authentication Pages - Implementation Guide

Modern, beautiful authentication pages (Login & Register) with glassmorphism design, matching your restaurant website's aesthetic.

## 📦 Files Included

1. **Login.jsx** - Login page with email/password and social login
2. **Register.jsx** - Registration page with full validation
3. **auth.css** - Shared stylesheet for both pages

## ✨ Features

### 🎨 Design Features
- **Glassmorphism UI** - Modern frosted glass effect
- **Animated Background** - Floating gradient orbs
- **Smooth Animations** - Framer Motion powered
- **Gold Theme** - Matches restaurant branding
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Beautiful dark theme

### 🔒 Login Features
- Email & password authentication
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Social login (Google, Facebook, Apple)
- Form validation
- Loading states
- Error messages

### 📝 Register Features
- Multi-field form (first name, last name, email, phone, password)
- Real-time validation
- Password strength requirements
- Confirm password matching
- Terms & conditions checkbox
- Social registration
- Side-by-side name fields
- Comprehensive error handling

## 🚀 Installation

### 1. Copy Files to Your Project

```
src/
├── pages/
│   ├── Login.jsx          # Login page
│   └── Register.jsx       # Register page
├── styles/
│   └── auth.css          # Shared auth styles
```

### 2. Import CSS in Your Main File

```javascript
// main.jsx or App.jsx
import './styles/auth.css';
```

### 3. Add Routes

```javascript
// App.jsx or your router file
import Login from './pages/Login';
import Register from './pages/Register';

<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  {/* ... other routes */}
</Routes>
```

## 🎯 Usage Examples

### Basic Login

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your login logic here
    const response = await loginUser(formData);
    if (response.success) {
      navigate('/dashboard');
    }
  };

  // ... rest of component
};
```

### Basic Register

```javascript
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your registration logic here
    const response = await registerUser(formData);
    if (response.success) {
      navigate('/login');
    }
  };

  // ... rest of component
};
```

## 🔧 Customization

### Change Colors

Edit `auth.css`:

```css
/* Change primary gold color */
.btn-submit,
.logo-icon {
  background: linear-gradient(135deg, #your-color, #your-color-dark);
}

/* Change focus colors */
.form-input:focus {
  border-color: #your-color;
  box-shadow: 0 0 0 4px rgba(your-color-rgb, 0.1);
}
```

### Modify Orb Colors

```css
.orb-1 {
  background: linear-gradient(135deg, #color1, #color2);
}

.orb-2 {
  background: linear-gradient(135deg, #color3, #color4);
}
```

### Add More Social Providers

```javascript
// In Login.jsx or Register.jsx
<motion.button
  onClick={() => handleSocialLogin('github')}
  className="social-btn"
>
  <GithubIcon />
  <span>GitHub</span>
</motion.button>
```

## 🎨 Styling Details

### Glassmorphism Effect
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Animated Background Orbs
- 3 gradient orbs with blur effect
- Smooth floating animation
- Positioned strategically for depth

### Input States
- **Default**: Subtle background with border
- **Hover**: Slightly brighter background
- **Focus**: Gold border with glow shadow
- **Error**: Red border with error background

### Button States
- **Default**: Gold gradient
- **Hover**: Lifted with stronger shadow
- **Active**: Pressed down effect
- **Disabled**: Reduced opacity

## 🔐 Form Validation

### Login Validation
```javascript
{
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/
  },
  password: {
    required: true,
    minLength: 6
  }
}
```

### Register Validation
```javascript
{
  firstName: {
    required: true,
    minLength: 2
  },
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/
  },
  phone: {
    required: true,
    pattern: /^[0-9]{10}$/
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  },
  confirmPassword: {
    required: true,
    match: password
  }
}
```

## 📱 Responsive Breakpoints

### Desktop (> 640px)
- Two-column name fields
- Three-column social buttons
- Full card width (480px)
- Visible background orbs

### Mobile (≤ 640px)
- Single-column name fields
- Single-column social buttons
- Stacked form options
- Smaller orbs (300px)
- Adjusted padding

### Small Mobile (≤ 400px)
- Compact padding
- Smaller font sizes
- Optimized touch targets

## 🎭 Animations

### Page Load
- Card fades in from bottom
- Staggered children animation
- 0.6s duration with easeOut

### Form Interactions
- Smooth input focus transitions
- Error messages slide in
- Button hover lift effect
- Loading spinner rotation

### Background
- Orbs float continuously
- 20s infinite loop
- Different delays for each orb

## 🔄 State Management

### Form State
```javascript
const [formData, setFormData] = useState({
  email: '',
  password: '',
  // ... other fields
});
```

### Error State
```javascript
const [errors, setErrors] = useState({
  email: '',
  password: '',
  // ... other fields
});
```

### Loading State
```javascript
const [isLoading, setIsLoading] = useState(false);
```

### Password Visibility
```javascript
const [showPassword, setShowPassword] = useState(false);
```

## 🌐 API Integration

### Login Example
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token
      localStorage.setItem('token', data.token);
      
      // Redirect
      navigate('/dashboard');
    } else {
      setErrors({ general: data.message });
    }
  } catch (error) {
    setErrors({ general: 'An error occurred' });
  } finally {
    setIsLoading(false);
  }
};
```

### Register Example
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Redirect to login
      navigate('/login', { 
        state: { message: 'Account created successfully!' }
      });
    } else {
      setErrors({ general: data.message });
    }
  } catch (error) {
    setErrors({ general: 'An error occurred' });
  } finally {
    setIsLoading(false);
  }
};
```

## 🔑 Social Login Implementation

### Google OAuth
```javascript
const handleGoogleLogin = () => {
  window.location.href = `${API_URL}/auth/google`;
};
```

### Facebook OAuth
```javascript
const handleFacebookLogin = () => {
  window.location.href = `${API_URL}/auth/facebook`;
};
```

### Apple Sign In
```javascript
const handleAppleLogin = () => {
  window.location.href = `${API_URL}/auth/apple`;
};
```

## 🛡️ Security Best Practices

### 1. Password Requirements
```javascript
// Minimum 8 characters
// At least one uppercase letter
// At least one lowercase letter
// At least one number
// Optional: special character
```

### 2. HTTPS Only
Always use HTTPS in production for secure data transmission.

### 3. Token Storage
```javascript
// Use secure storage
localStorage.setItem('token', token); // For non-sensitive
// Or use httpOnly cookies for sensitive tokens
```

### 4. CSRF Protection
```javascript
// Include CSRF token in requests
headers: {
  'X-CSRF-Token': csrfToken
}
```

### 5. Rate Limiting
Implement rate limiting on your backend to prevent brute force attacks.

## 📊 Component Architecture

```
Login/Register Component
├── Animation Variants (Framer Motion)
├── Form State Management
├── Validation Logic
├── API Integration
├── Error Handling
├── Loading States
└── Navigation Logic
```

## 🎨 Color Palette

```css
/* Primary Colors */
--gold: #eab308;
--gold-light: #f59e0b;
--gold-dark: #d4af37;

/* Background */
--bg-dark: #000000;
--bg-gray: #111111;

/* Text */
--text-primary: #ffffff;
--text-secondary: #d1d5db;
--text-muted: #9ca3af;

/* Status */
--error: #ef4444;
--success: #10b981;
--warning: #f59e0b;
```

## 🎯 Best Practices

### 1. Form Validation
- Validate on submit
- Show errors inline
- Clear errors on input change
- Provide helpful error messages

### 2. User Feedback
- Show loading states
- Display success messages
- Handle errors gracefully
- Use animations for transitions

### 3. Accessibility
- Proper labels for inputs
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

### 4. Performance
- Debounce validation
- Lazy load social icons
- Optimize animations
- Use React.memo where appropriate

## 🐛 Common Issues & Solutions

### Issue: Background orbs causing lag on mobile
**Solution:** Reduce orb count or disable on mobile
```css
@media (max-width: 640px) {
  .orb-3 {
    display: none;
  }
}
```

### Issue: Form not submitting
**Solution:** Check validation logic and preventDefault
```javascript
const handleSubmit = async (e) => {
  e.preventDefault(); // Important!
  if (!validateForm()) return;
  // ... submit logic
};
```

### Issue: Social login not working
**Solution:** Verify OAuth configuration and redirect URIs

## 📚 Additional Features to Implement

### 1. Email Verification
- Send verification email after registration
- Verify token on email link click
- Show verification status

### 2. Password Reset
- Forgot password flow
- Email with reset link
- Reset password form

### 3. Two-Factor Authentication
- SMS or authenticator app
- QR code for setup
- Backup codes

### 4. Remember Me
- Extended session duration
- Secure token storage
- Automatic logout

## 🎉 Success States

### Login Success
```javascript
// Show success message
toast.success('Welcome back!');

// Redirect to dashboard
navigate('/dashboard');
```

### Register Success
```javascript
// Show success message
toast.success('Account created! Please check your email.');

// Redirect to login
navigate('/login');
```

## 📝 Testing

### Unit Tests
```javascript
describe('Login Form', () => {
  test('validates email format', () => {
    // Test email validation
  });
  
  test('shows error for empty password', () => {
    // Test password validation
  });
});
```

### Integration Tests
```javascript
describe('Login Flow', () => {
  test('logs in user successfully', async () => {
    // Test full login flow
  });
});
```

## 🚀 Deployment Checklist

- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify API endpoints
- [ ] Configure OAuth providers
- [ ] Set up environment variables
- [ ] Enable HTTPS
- [ ] Test form validation
- [ ] Test error handling
- [ ] Test loading states
- [ ] Optimize performance
- [ ] Add analytics tracking

---

**Your authentication pages are now ready to use! 🎉**

The design perfectly matches your restaurant website's aesthetic with the gold theme, glassmorphism effects, and smooth animations. Both pages are fully responsive, accessible, and production-ready.