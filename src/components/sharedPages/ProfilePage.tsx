import ProfileForm from "../forms/ProfileForm";
import ChangePassword from "../forms/ChangePassword";


export default function ProfilePage() {

    return (
        <div className={"w-full flex flex-wrap gap-4 min-h-[calc(100vh-70px)] md:h-screen"}>
            <ProfileForm />
            <ChangePassword />
        </div>
    )
}


