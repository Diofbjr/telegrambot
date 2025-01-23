interface PasswordRequirement {
    text: string;
    isValid: boolean;
  }
  
  interface PasswordRequirementsProps {
    requirements: PasswordRequirement[];
  }
  
  export const PasswordRequirements = ({ requirements }: PasswordRequirementsProps) => {
    return (
      <div className="space-y-2">
        {requirements.map((req, index) => (
          <p
            key={index}
            className={`text-sm ${req.isValid ? 'text-green-500' : 'text-red-500'}`}
          >
            {req.text}
          </p>
        ))}
      </div>
    );
  };