import bcrypt

from models.user_model import UserModel


def create_doctor():
    email = input("Doctor email: ").strip().lower()
    full_name = input("Doctor full name: ").strip()
    password = input("Doctor password: ")

    if not email or not full_name or not password:
        print("All fields are required.")
        return

    existing_user = UserModel.find_by_email(email)

    if existing_user:
        print("A user with this email already exists.")
        return

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    doctor = {
        "full_name": full_name,
        "email": email,
        "password": hashed_password,
        "role": "doctor",
        "is_verified": True,
        "is_active": True
    }

    user_id = UserModel.create_user(doctor)

    print("Doctor account created successfully.")
    print(f"Doctor ID: {user_id}")


if __name__ == "__main__":
    create_doctor()