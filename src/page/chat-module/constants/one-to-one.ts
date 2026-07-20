export const oneToOneData = [
    {
        id: 1,
        label_text: "Ayushi",
        msg: "hi",
        time: "10:25",
        count: 5


    },
    {
        id: 2,
        label_text: "priya",
        msg: "hi",
        time: "10:25",
        count: 5

    },
    {
        id: 3,
        label_text: "prit",
        msg: "hi",
        time: "10:25",
        count: 5

    }
]

export const contacts = [


    {
        id: 1,
        profileIcon: "assets/icons/Avatar.svg",
        name: "Nitesh Nimje"
    },
    {
        id: 2,
        profileIcon: "assets/icons/Avatar.svg",
        name: "Ayushi Kanoje"
    },
    {
        id: 3,
        profileIcon: "assets/icons/Avatar.svg",
        name: "Gaurav khaana"
    },
    {
        id: 4,
        profileIcon: "assets/icons/Avatar.svg",
        name: "Nitesh Nimje"
    },
    {
        id: 5,
        profileIcon: "assets/icons/Avatar.svg",
        name: "Nitesh Nimje"
    }
]


export const
    validator = {
        fullName: (value: string) => {
            if (!value) return "Name is Required";
            if (value.length < 3) return "Name must be have atleast 3 character";
            return "";
        },
        email: (value: string) => {
            if (!value) return "Email is required";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return "Invalid email format";
            return "";
        },
        phoneNumber: (value: string) => {
            if (!value) return "Phone number is required";
            if (!/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
            return "";
        },
        passWord: (value: string) => {
            if (!value) {
                return "Password is required!!"
            }
            else if (!/^[a-zA-Z0-9@]+$/.test(value))
                return "Password can contain only letters, numbers and @";
            else if (value.length < 8) {
                return "Password must be 8 character long !!"

            }
            return ""

        },
        confPassword: (value: string, formData?: any) => {
            if (!value) {
                return "Password is required!!"
            }
            if (value != formData.passWord.value) {
                return "Password do not match !!"
            }
            return ""
        },
        about: (value: string) => {
            if (!value) {
                return "About is required!!"
            }
            if (value.length > 50) {
                return "About must be 50 Character only"
            }
            return ""
        },
        profileName: (value: string) => {
            if (!value) {
                return "Name is required!!"
            }
            if (value.length > 50) {
                return "Profile Name must be 50 Character only"
            }
        }

    };