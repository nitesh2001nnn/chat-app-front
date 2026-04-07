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


export const validator = {
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
};