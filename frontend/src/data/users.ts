export interface Users {
    token: string,
    id: string | number,
    first_name: string,
    last_name: string,
    email: string,
    contact: string,
    current_password: string,
    password: string,
    password_confirmation: string,
    role: `admin` | `customer`,
}