import "./UserCard.css";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
}

// Displays user information in a card layout
export function UserCard({ name, email, role }: UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-card-content">
        <h3 className="user-name">{name}</h3>
        <div className="user-detail">
          <span className="user-label">Email:</span>
          <span className="user-value">{email}</span>
        </div>
        <div className="user-detail">
          <span className="user-label">Role:</span>
          <span className="user-value">{role}</span>
        </div>
      </div>
    </div>
  );
}
