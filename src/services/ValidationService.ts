interface ValidationResult {
    valid: boolean;
    errors: Record<string, string>;
  }
  
  const ValidationService = {
    validateSignIn(email: string, password: string): ValidationResult {
      const errors: Record<string, string> = {};
  
      if (!email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
      }
  
      if (!password) {
        errors.password = "Password is required";
      }
  
      return {
        valid: Object.keys(errors).length === 0,
        errors,
      };
    },
  
   
    validateSignUp(data: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        password_confirmation: string;
      }): ValidationResult {
        const errors: Record<string, string> = {};
      
        if (!data.first_name) errors.first_name = "First name is required";
        if (!data.last_name) errors.last_name = "Last name is required";
      
        if (!data.email) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
          errors.email = "Email is invalid";
        }
      
        if (!data.password) {
          errors.password = "Password is required";
        } else if (data.password.length < 8) {
          errors.password = "Password must be at least 8 characters";
        }
      
        if (data.password !== data.password_confirmation) {
          errors.password_confirmation = "Passwords do not match";
        }
      
        return {
          valid: Object.keys(errors).length === 0,
          errors,
        };
      }
    }      
  
  export default ValidationService;
  