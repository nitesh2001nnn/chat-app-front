export const 
createEditConfig = (
    profile: any,
    handlers: {
        updateAbout: (value: string) => void;
        updateName: (value: string) => void;
        updateEmail: (value: string) => void;
    }
) => ({
    about: {
        title: "About",
        limit: 200,
        buttonText: "Save About",
        value: profile,
        submit: handlers.updateAbout,
        stateName: "about",
        placeholder: "Enter about yourself!!"
    },
    profileName: {
        title: "Name",
        limit: 30,
        buttonText: "Save Name",
        value: profile,
        submit: handlers.updateName,
        stateName: "profileName",
        placeholder: "Enter your Name!!"
    },
    email: {
        title: "Email",
        limit: 100,
        buttonText: "Update Email",
        value: profile,
        submit: handlers.updateEmail,
        stateName: "email",
        placeholder: "Enter your email!!"
    },
});

export const PROFILE_SECTIONS = [
    {
        key: "about",
        label: "About",
    },
    {
        key: "profileName",
        label: "Name",
    },
    {
        key: "email",
        label: "Email",
    },
] as const;